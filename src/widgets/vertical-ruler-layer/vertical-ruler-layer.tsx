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
			if (offsets.x < 0) {
				context.clearRect(
					0,
					0,
					pixelSize * numberColumns + RULER_SIZE,
					pixelSize * numberRows + RULER_SIZE
				);
				return;
			}
			context.imageSmoothingEnabled = false;
			context.resetTransform();
			context.clearRect(
				0,
				0,
				pixelSize * numberColumns + RULER_SIZE,
				pixelSize * numberRows + RULER_SIZE
			);
			context.translate(offsets.x, offsets.y);
			context.scale(scale, scale);
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
				top: RULER_SIZE,
				left: 0,
				zIndex: 0,
			}}
			width={pixelSize * numberColumns + RULER_SIZE}
			height={pixelSize * numberRows + RULER_SIZE}
		/>
	);
}
