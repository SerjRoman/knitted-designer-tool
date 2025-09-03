import { useCallback } from "react";
import { drawGridLayer } from "@/entities/canvas";
import { RULER_SIZE, useAppSelector } from "@/shared/lib";
import { Canvas } from "@/shared/ui";

export function GridLayer() {
	const { pixelSize, numberColumns, numberRows } = useAppSelector(
		(state) => state.canvas
	);
	const handleDrawGrid = useCallback(
		(context: CanvasRenderingContext2D) => {
			drawGridLayer(context, pixelSize, numberColumns, numberRows);
		},
		[numberColumns, numberRows, pixelSize]
	);
	return (
		<Canvas
			draw={handleDrawGrid}
			style={{
				position: "absolute",
				zIndex: 2,
				pointerEvents: "none",
			}}
			width={pixelSize * numberColumns + RULER_SIZE}
			height={pixelSize * numberRows + RULER_SIZE}
		/>
	);
}
