import { useCallback } from "react";
import {
	CANVAS_HEIGHT,
	CANVAS_WIDTH,
	drawPixelLayer,
	selectPixelDimensions,
} from "@/entities/canvas";
import { useAppSelector } from "@/shared/store";
import { Canvas } from "@/shared/ui";

export function CanvasLayer() {
	const { grid } = useAppSelector((state) => state.canvas);
	const { scale, offsets } = useAppSelector((state) => state.viewport);
	const pixelDimensions = useAppSelector(selectPixelDimensions);
	const handleDraw = useCallback(
		(context: CanvasRenderingContext2D) => {
			context.imageSmoothingEnabled = false;
			context.resetTransform();
			context.clearRect(
				0,
				0,
				context.canvas.width,
				context.canvas.height
			);
			context.translate(offsets.x, offsets.y);
			context.scale(scale, scale);

			drawPixelLayer(
				context,
				grid,
				pixelDimensions.width,
				pixelDimensions.height
			);
		},
		[grid, scale, offsets, pixelDimensions]
	);

	return (
		<Canvas
			draw={handleDraw}
			style={{
				position: "absolute",
				zIndex: 2,
				pointerEvents: "none",
			}}
			width={CANVAS_WIDTH}
			height={CANVAS_HEIGHT}
		/>
	);
}
