import { useCallback } from "react";
import {
	CANVAS_HEIGHT,
	CANVAS_WIDTH,
	drawGridLayer,
	selectPixelDimensions,
} from "@/entities/canvas";
import { useAppSelector } from "@/shared/store";
import { Canvas } from "@/shared/ui";

export function GridLayer() {
	const { numberOfColumns, numberOfRows } = useAppSelector(
		(state) => state.canvas
	);
	const pixelDimensions = useAppSelector(selectPixelDimensions);
	const { scale, offsets } = useAppSelector((state) => state.viewport);
	const handleDrawGrid = useCallback(
		(context: CanvasRenderingContext2D) => {
			context.resetTransform();
			context.clearRect(
				0,
				0,
				context.canvas.width,
				context.canvas.height
			);
			context.translate(offsets.x, offsets.y);
			context.scale(scale, scale);
			drawGridLayer(
				context,
				pixelDimensions.width,
				pixelDimensions.height,
				numberOfColumns,
				numberOfRows,
				scale
			);
		},
		[offsets, scale, pixelDimensions, numberOfColumns, numberOfRows]
	);

	return (
		<Canvas
			draw={handleDrawGrid}
			style={{
				position: "absolute",
				zIndex: 3,
				pointerEvents: "none",
			}}
			width={CANVAS_WIDTH}
			height={CANVAS_HEIGHT}
		/>
	);
}
