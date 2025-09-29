import { useCallback } from "react";
import { drawVerticalRulerLayer } from "@/entities/canvas";
import {
	CANVAS_HEIGHT,
	CANVAS_WIDTH,
	RULER_SIZE,
	useAppSelector,
} from "@/shared/lib";
import { Canvas } from "@/shared/ui";

export function VerticalRulerLayer() {
	const { numberRows, pixelSize } = useAppSelector((state) => state.canvas);
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
			drawVerticalRulerLayer(
				context,
				numberRows,
				pixelSize,
				scale,
				offsets
			);
		},
		[numberRows, offsets, pixelSize, scale]
	);
	return (
		<Canvas
			draw={handleDrawRuler}
			style={{
				position: "absolute",
				zIndex: 0,
				top: RULER_SIZE,
			}}
			width={CANVAS_WIDTH}
			height={CANVAS_HEIGHT}
		/>
	);
}
