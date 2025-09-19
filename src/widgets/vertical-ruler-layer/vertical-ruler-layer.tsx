import { useCallback } from "react";
import { drawVerticalRulerLayer } from "@/entities/canvas";
import { RULER_SIZE, useAppSelector } from "@/shared/lib";
import { Canvas } from "@/shared/ui";

export function VerticalRulerLayer() {
	const { numberColumns, numberRows, pixelSize } = useAppSelector(
		(state) => state.canvas
	);
	const { scale, offsets } = useAppSelector((state) => state.viewport);

	const handleDrawRuler = useCallback(
		(context: CanvasRenderingContext2D) => {
			context.imageSmoothingEnabled = false;
			context.resetTransform();
			context.clearRect(
				0,
				0,
				pixelSize * numberColumns + RULER_SIZE,
				pixelSize * numberRows + RULER_SIZE
			);
			drawVerticalRulerLayer(
				context,
				numberRows,
				pixelSize,
				scale,
				offsets
			);
		},
		[numberColumns, numberRows, offsets, pixelSize, scale]
	);
	return (
		<Canvas
			draw={handleDrawRuler}
			style={{
				position: "absolute",
				zIndex: 0,
				top: RULER_SIZE,
			}}
			width={pixelSize * numberColumns}
			height={pixelSize * numberRows}
		/>
	);
}
