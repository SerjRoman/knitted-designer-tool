import { useCallback } from "react";
import { drawHorizontalRulerLayer } from "@/entities/canvas";
import { RULER_SIZE, useAppSelector } from "@/shared/lib";
import { Canvas } from "@/shared/ui";

export function HorizontalRulerLayer() {
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
				context.canvas.width,
				context.canvas.height
			);

			drawHorizontalRulerLayer(
				context,
				numberColumns,
				pixelSize,
				scale,
				offsets
			);
		},
		[numberColumns, offsets, pixelSize, scale]
	);
	return (
		<Canvas
			draw={handleDrawRuler}
			style={{
				position: "absolute",
				top: 0,
				left: RULER_SIZE,
				zIndex: 0,
			}}
			width={pixelSize * numberColumns + RULER_SIZE}
			height={pixelSize * numberRows + RULER_SIZE}
		/>
	);
}
