import { useCallback } from "react";
import {
	drawGridLayer,
	selectCanvasDimensions,
	selectPixelDimensions,
} from "@/entities/canvas";
import { useAppSelector } from "@/shared/store";
import { Canvas } from "@/shared/ui";

export function GridLayer() {
	const { numberOfColumns, numberOfRows } = useAppSelector(
		(state) => state.canvas,
	);
	const canvasDimensions = useAppSelector(selectCanvasDimensions);

	const pixelDimensions = useAppSelector(selectPixelDimensions);
	const { scale, offsets } = useAppSelector((state) => state.viewport);
	const handleDrawGrid = useCallback(
		(context: CanvasRenderingContext2D) => {
			context.resetTransform();
			context.clearRect(
				0,
				0,
				canvasDimensions.width,
				canvasDimensions.height,
			);
			context.translate(offsets.x, offsets.y);
			context.scale(scale, scale);
			drawGridLayer(
				context,
				pixelDimensions.width,
				pixelDimensions.height,
				numberOfColumns,
				numberOfRows,
				scale,
			);
		},
		[
			offsets,
			scale,
			pixelDimensions,
			numberOfColumns,
			numberOfRows,
			canvasDimensions,
		],
	);

	return (
		<Canvas
			draw={handleDrawGrid}
			style={{
				position: "absolute",
				zIndex: 3,
				pointerEvents: "none",
			}}
			width={canvasDimensions.width}
			height={canvasDimensions.height}
		/>
	);
}
