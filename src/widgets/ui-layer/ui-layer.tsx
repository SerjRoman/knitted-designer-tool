import { useCallback, useMemo, useState, type MouseEvent } from "react";
import { useClipboardPreview } from "@/features/clipboard-control";
import {
	useColorPickerTool,
	useDrawingTool,
	useFillTool,
	useLineTool,
	usePasteTool,
	useRectTool,
	useSelectTool,
} from "@/features/draw-with-tool";
import { drawCrosshair, drawSelectedPoints } from "@/entities/canvas";
import {
	CANVAS_HEIGHT,
	CANVAS_WIDTH,
	RULER_SIZE,
	useAppSelector,
	usePointFromEvent,
} from "@/shared/lib";
import { Canvas } from "@/shared/ui";

export function UILayer() {
	const [isDrawing, setIsDrawing] = useState(false);
	const { point, updatePointFromEvent } = usePointFromEvent();
	const lineHandlers = useLineTool();
	const selectHandlers = useSelectTool();
	const rectHandlers = useRectTool();
	const pasteHandlers = usePasteTool();
	const drawingHandlers = useDrawingTool();
	const colorPickerHandlers = useColorPickerTool();
	const fillHandlers = useFillTool();
	const drawClipboard = useClipboardPreview();
	const { pixelSize } = useAppSelector((state) => state.canvas);
	const { scale, offsets, isPanning } = useAppSelector(
		(state) => state.viewport
	);
	const { toolState, selectedPoints } = useAppSelector(
		(state) => state.editor
	);
	const activeToolHandlers = useMemo(() => {
		switch (toolState.tool) {
			case "brush":
			case "eraser":
				return drawingHandlers;
			case "colorPicker":
				return colorPickerHandlers;
			case "line":
				return lineHandlers;
			case "paste":
				return pasteHandlers;
			case "rect":
				return rectHandlers;
			case "fill":
				return fillHandlers;
			case "select":
				return selectHandlers;
			default:
				return {};
		}
	}, [
		colorPickerHandlers,
		fillHandlers,
		drawingHandlers,
		lineHandlers,
		pasteHandlers,
		rectHandlers,
		selectHandlers,
		toolState.tool,
	]);
	const handleDraw = useCallback(
		(context: CanvasRenderingContext2D) => {
			const canvas = context.canvas;
			context.imageSmoothingEnabled = false;
			context.resetTransform();

			context.clearRect(0, 0, canvas.width, canvas.height);

			context.translate(offsets.x, offsets.y);
			context.scale(scale, scale);
			if (selectedPoints) {
				drawSelectedPoints(context, selectedPoints, pixelSize);
			}

			if (!point || isPanning) return;

			drawClipboard.draw?.(context, point);
			if (isDrawing) {
				activeToolHandlers.onDrawPreview?.(context, { point });
			} else {
				drawCrosshair(context, point, pixelSize);
			}
		},
		[
			offsets,
			scale,
			selectedPoints,
			point,
			isPanning,
			drawClipboard,
			isDrawing,
			pixelSize,
			activeToolHandlers,
		]
	);

	function handleMouseDown(event: MouseEvent<HTMLCanvasElement>) {
		if (isPanning || !point) return;
		setIsDrawing(true);
		activeToolHandlers.onMouseDown?.({ event, point });
	}

	function handleMouseUp(event: MouseEvent<HTMLCanvasElement>) {
		if (!isDrawing || !point) return;
		activeToolHandlers.onMouseUp?.({ point, event });
		setIsDrawing(false);
	}

	function handleMouseMove(event: MouseEvent<HTMLCanvasElement>) {
		updatePointFromEvent(event);
		if (!point || !isDrawing) return;
		activeToolHandlers.onMouseMove?.({ event, point });
	}

	return (
		<Canvas
			draw={handleDraw}
			style={{
				position: "absolute",
				zIndex: 100,
				top: RULER_SIZE,
				left: RULER_SIZE,
			}}
			width={CANVAS_WIDTH}
			height={CANVAS_HEIGHT}
			onMouseDown={handleMouseDown}
			onMouseUp={handleMouseUp}
			onMouseMove={handleMouseMove}
			onMouseLeave={handleMouseUp}
		/>
	);
}
