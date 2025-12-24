import { useCallback, useEffect, useState, type MouseEvent } from "react";
import { useClipboardPreview } from "@/features/clipboard-control";
import { useActiveToolHandlers } from "@/features/draw-with-tool";
import {
	CANVAS_HEIGHT,
	CANVAS_WIDTH,
	drawCrosshair,
	drawSelectedPoints,
} from "@/entities/canvas";
import { TOOLS } from "@/entities/editor";
import { useAppSelector, usePointFromEvent } from "@/shared/lib";
import { Canvas } from "@/shared/ui";

export function UILayer() {
	const [isDrawing, setIsDrawing] = useState(false);
	const { point, lastPoint, updatePointFromEvent } = usePointFromEvent();
	const drawClipboard = useClipboardPreview();
	const { pixelSize, numberOfColumns, numberOfRows } = useAppSelector(
		(state) => state.canvas
	);
	const activeToolHandlers = useActiveToolHandlers();

	const { scale, offsets, isPanning } = useAppSelector(
		(state) => state.viewport
	);
	const { toolState, selectedPoints } = useAppSelector(
		(state) => state.editor
	);

	useEffect(() => {
		if (!drawClipboard.clear) return;
		if (!TOOLS.CLIPBOARD_TOOLS.some((tool) => tool === toolState.tool)) {
			drawClipboard.clear();
		}
	}, [toolState.tool, drawClipboard]);

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
			if (isPanning || !lastPoint) return;
			drawClipboard.draw?.(context, lastPoint);
			activeToolHandlers.onDrawPreview?.(context, {
				point: lastPoint,
			});

			if (!isDrawing && point)
				drawCrosshair(
					context,
					point,
					pixelSize,
					numberOfColumns,
					numberOfRows
				);
		},
		[
			offsets,
			scale,
			selectedPoints,
			isPanning,
			lastPoint,
			drawClipboard,
			isDrawing,
			pixelSize,
			activeToolHandlers,
			point,
			numberOfColumns,
			numberOfRows,
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
			width={CANVAS_WIDTH}
			height={CANVAS_HEIGHT}
			onMouseDown={handleMouseDown}
			onMouseUp={handleMouseUp}
			onMouseMove={handleMouseMove}
			onMouseLeave={handleMouseLeave}
		/>
	);
}
