import { useCallback } from "react";
import {
	drawHorizontalRulerLayer,
	drawVerticalRulerLayer,
	selectCanvasDimensions,
	selectPixelDimensions,
} from "@/entities/canvas";
import { useAppSelector } from "@/shared/store";
import { Canvas } from "@/shared/ui";

export function RulersLayer() {
	const { numberOfRows, numberOfColumns } = useAppSelector(
		(state) => state.canvas,
	);
	const pixelDimensions = useAppSelector(selectPixelDimensions);
	const { scale, offsets } = useAppSelector((state) => state.viewport);
	const canvasDimensions = useAppSelector(selectCanvasDimensions);

	const handleDrawRuler = useCallback(
		(context: CanvasRenderingContext2D) => {
			context.imageSmoothingEnabled = false;
			context.resetTransform();
			context.clearRect(
				0,
				0,
				canvasDimensions.width,
				canvasDimensions.height,
			);
			drawVerticalRulerLayer(
				context,
				numberOfRows,
				pixelDimensions.height,
				scale,
				offsets,
			);
			drawHorizontalRulerLayer(
				context,
				numberOfColumns,
				pixelDimensions.width,
				scale,
				offsets,
			);
		},
		[
			numberOfColumns,
			numberOfRows,
			offsets,
			pixelDimensions,
			scale,
			canvasDimensions,
		],
	);
	return (
		<Canvas
			draw={handleDrawRuler}
			style={{
				position: "absolute",
				zIndex: 0,
			}}
			width={canvasDimensions.width}
			height={canvasDimensions.height}
		/>
	);
}
