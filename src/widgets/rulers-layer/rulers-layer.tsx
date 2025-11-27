import { useCallback } from "react";
import {
	CANVAS_HEIGHT,
	CANVAS_WIDTH,
	drawHorizontalRulerLayer,
	drawVerticalRulerLayer,
} from "@/entities/canvas";
import { useAppSelector } from "@/shared/lib";
import { Canvas } from "@/shared/ui";

export function RulersLayer() {
	const { numberOfRows, numberOfColumns, pixelSize } = useAppSelector(
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
			drawVerticalRulerLayer(
				context,
				numberOfRows,
				pixelSize,
				scale,
				offsets
			);
			drawHorizontalRulerLayer(
				context,
				numberOfColumns,
				pixelSize,
				scale,
				offsets
			);
		},
		[numberOfColumns, numberOfRows, offsets, pixelSize, scale]
	);
	return (
		<Canvas
			draw={handleDrawRuler}
			style={{
				position: "absolute",
				zIndex: 0,
			}}
			width={CANVAS_WIDTH}
			height={CANVAS_HEIGHT}
		/>
	);
}
