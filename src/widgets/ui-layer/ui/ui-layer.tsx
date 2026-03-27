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
} from "@/entities/canva";
import { TOOLS } from "@/entities/editor";
import { usePointFromEvent } from "@/shared/lib";
import { useAppDispatch, useAppSelector } from "@/shared/store";
import { Canvas } from "@/shared/ui";
import { selectShowCrosshair } from "@/entities/settings";

export function UILayer() {
	const [isDrawing, setIsDrawing] = useState(false);
	const dispatch = useAppDispatch();
	const pixelDimensions = useAppSelector(selectPixelDimensions);
	const { point, lastPoint, updatePointFromEvent } = usePointFromEvent({
		pixelDimensions,
	});
	const drawClipboard = useClipboardPreview();
	const { numberOfColumns, numberOfRows } = useAppSelector(
		(state) => state.canvas,
	);
	const canvasDimensions = useAppSelector(selectCanvasDimensions);

	const activeToolHandlers = useActiveToolHandlers();

	const { scale, offsets, isPanning } = useAppSelector(
		(state) => state.viewport,
	);
	const { toolState } = useAppSelector((state) => state.editor);

	const isPanningOrMove = isPanning || toolState.tool === "move";
	const doShowCrosshair = useAppSelector(selectShowCrosshair);

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

			if (isPanningOrMove || !lastPoint) return;
			drawClipboard.draw?.(context, lastPoint);
			activeToolHandlers.onDrawPreview?.(context, {
				currentPoint: point,
				lastValidPoint: lastPoint,
			});

			if (!isDrawing && point && doShowCrosshair)
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
			canvasDimensions.width,
			canvasDimensions.height,
			offsets.x,
			offsets.y,
			scale,
			isPanningOrMove,
			lastPoint,
			drawClipboard,
			activeToolHandlers,
			point,
			isDrawing,
			pixelDimensions.width,
			pixelDimensions.height,
			numberOfColumns,
			numberOfRows,
			doShowCrosshair,
		],
	);

	function handleMouseDown(event: MouseEvent<HTMLCanvasElement>) {
		if (!point) return;
		if (isPanningOrMove) {
			activeToolHandlers.onMouseDown?.({ event, point });
			return;
		}
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
				zIndex: 4,
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
