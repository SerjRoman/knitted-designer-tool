import { useCallback } from "react";
import { drawGridLayer } from "@/entities/canvas";
import {
	CANVAS_HEIGHT,
	CANVAS_WIDTH,
	RULER_SIZE,
	useAppSelector,
} from "@/shared/lib";
import { Canvas } from "@/shared/ui";

export function GridLayer() {
	const { pixelSize, numberColumns, numberRows } = useAppSelector(
		(state) => state.canvas
	);
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
			drawGridLayer(context, pixelSize, numberColumns, numberRows, scale);
		},
		[numberColumns, numberRows, pixelSize, scale, offsets]
	);

	return (
		<Canvas
			draw={handleDrawGrid}
			style={{
				position: "absolute",
				zIndex: 3,
				pointerEvents: "none",
				top: RULER_SIZE,
				left: RULER_SIZE,
			}}
			width={CANVAS_WIDTH}
			height={CANVAS_HEIGHT}
		/>
	);
}
