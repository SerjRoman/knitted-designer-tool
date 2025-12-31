import { useCallback } from "react";
import {
	CANVAS_HEIGHT,
	CANVAS_WIDTH,
	drawHorizontalRulerLayer,
	drawVerticalRulerLayer,
	selectPixelDimensions,
} from "@/entities/canvas";
import { useAppSelector } from "@/shared/store";
import { Canvas } from "@/shared/ui";

export function RulersLayer() {
	const { numberOfRows, numberOfColumns } = useAppSelector(
		(state) => state.canvas
	);
	const pixelDimensions = useAppSelector(selectPixelDimensions);
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
				pixelDimensions.height,
				scale,
				offsets
			);
			drawHorizontalRulerLayer(
				context,
				numberOfColumns,
				pixelDimensions.width,
				scale,
				offsets
			);
		},
		[numberOfColumns, numberOfRows, offsets, pixelDimensions, scale]
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
