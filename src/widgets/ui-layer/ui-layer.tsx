import { useCallback, useEffect, useState, type MouseEvent } from "react";
import {
	pasteFromClipboard,
	useClipboardPreview,
} from "@/features/clipboard-control";
import { useActiveToolHandlers } from "@/features/draw-with-tool";
import {
	drawCrosshair,
	selectCanvasDimensions,
	selectPixelDimensions,
} from "@/entities/canvas";
import { TOOLS } from "@/entities/editor";
import { usePointFromEvent } from "@/shared/lib";
import { useAppDispatch, useAppSelector } from "@/shared/store";
import { Canvas } from "@/shared/ui";

export function UILayer() {
	const [isDrawing, setIsDrawing] = useState(false);
	const dispatch = useAppDispatch();
	const { point, lastPoint, updatePointFromEvent } = usePointFromEvent();
	const drawClipboard = useClipboardPreview();
	const { numberOfColumns, numberOfRows } = useAppSelector(
		(state) => state.canvas,
	);
	const canvasDimensions = useAppSelector(selectCanvasDimensions);

	const pixelDimensions = useAppSelector(selectPixelDimensions);
	const activeToolHandlers = useActiveToolHandlers();

	const { scale, offsets, isPanning } = useAppSelector(
		(state) => state.viewport,
	);
	const { toolState } = useAppSelector((state) => state.editor);

	useEffect(() => {
		if (!drawClipboard.clear) return;
		if (!TOOLS.CLIPBOARD_TOOLS.some((tool) => tool === toolState.tool)) {
			drawClipboard.clear();
		}
	}, [toolState.tool, drawClipboard]);

	const handleDraw = useCallback(
		(context: CanvasRenderingContext2D) => {
			context.imageSmoothingEnabled = false;
			context.resetTransform();

			context.clearRect(
				0,
				0,
				canvasDimensions.width,
				canvasDimensions.height,
			);

			context.translate(offsets.x, offsets.y);
			context.scale(scale, scale);

			if (isPanning || !lastPoint) return;
			drawClipboard.draw?.(context, lastPoint);
			activeToolHandlers.onDrawPreview?.(context, {
				currentPoint: point,
				lastValidPoint: lastPoint,
			});

			if (!isDrawing && point)
				drawCrosshair(
					context,
					point,
					pixelDimensions.width,
					pixelDimensions.height,
					numberOfColumns,
					numberOfRows,
				);
		},
		[
			offsets,
			scale,
			isPanning,
			lastPoint,
			activeToolHandlers,
			isDrawing,
			point,
			pixelDimensions,
			numberOfColumns,
			numberOfRows,
			drawClipboard,
			canvasDimensions,
		],
	);

	function handleMouseDown(event: MouseEvent<HTMLCanvasElement>) {
		if (isPanning || !point) return;
		setIsDrawing(true);
		activeToolHandlers.onMouseDown?.({ event, point });
		if (toolState.tool === "paste") {
			dispatch(pasteFromClipboard(point));
		}
	}

	function handleMouseUp(event: MouseEvent<HTMLCanvasElement>) {
		if (!isDrawing || !point) return;
		activeToolHandlers.onMouseUp?.({ point, event });
		setIsDrawing(false);
	}
	function outOfDrawinArea(event: MouseEvent<HTMLCanvasElement>) {
		if (!lastPoint) return;
		activeToolHandlers.onMouseLeave?.({ event, point: lastPoint });
		setIsDrawing(false);
	}

	function handleMouseMove(event: MouseEvent<HTMLCanvasElement>) {
		updatePointFromEvent(event);
		if (!point) {
			outOfDrawinArea(event);
			return;
		}
		if (!isDrawing) return;
		activeToolHandlers.onMouseMove?.({ event, point });
	}
	function handleMouseLeave(event: MouseEvent<HTMLCanvasElement>) {
		outOfDrawinArea(event);
	}
	return (
		<Canvas
			draw={handleDraw}
			style={{
				position: "absolute",
				zIndex: 100,
			}}
			width={canvasDimensions.width}
			height={canvasDimensions.height}
			onMouseDown={handleMouseDown}
			onMouseUp={handleMouseUp}
			onMouseMove={handleMouseMove}
			onMouseLeave={handleMouseLeave}
		/>
	);
}
