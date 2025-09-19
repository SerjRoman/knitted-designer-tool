import { useCallback } from "react";
import { drawPixelLayer, selectOffsets } from "@/entities/canvas";
import { RULER_SIZE, useAppSelector } from "@/shared/lib";
import { Canvas } from "@/shared/ui";

export function CanvasLayer() {
	const {
		grid,
		pixelSize,
		numberColumns,
		numberRows,
		columnWidths,
		rowHeights,
	} = useAppSelector((state) => state.canvas);
	const { columnOffsets, rowOffsets } = useAppSelector(selectOffsets);
	const { scale, offsets } = useAppSelector((state) => state.viewport);

	const handleDraw = useCallback(
		(context: CanvasRenderingContext2D) => {
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

			drawPixelLayer(
				context,
				grid,
				columnOffsets,
				rowOffsets,
				columnWidths,
				rowHeights
			);
		},
		[
			columnOffsets,
			columnWidths,
			grid,
			numberColumns,
			numberRows,
			pixelSize,
			rowHeights,
			rowOffsets,
			scale,
			offsets,
		]
	);

	return (
		<Canvas
			draw={handleDraw}
			style={{
				position: "absolute",
				zIndex: 2,
				top: RULER_SIZE,
				left: RULER_SIZE,
				pointerEvents: "none",
			}}
			width={pixelSize * numberColumns}
			height={pixelSize * numberRows}
		/>
	);
}
