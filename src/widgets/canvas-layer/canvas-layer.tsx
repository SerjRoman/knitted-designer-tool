import { useCallback, useState, type MouseEvent } from "react";
import { drawPixel } from "@/features/draw-pixel";
import { pickColor } from "@/features/select-tool";
import { drawPixelLayer, selectOffsets } from "@/entities/canvas";
import { RULER_SIZE, useAppDispatch, useAppSelector } from "@/shared/lib";
import { Canvas } from "@/shared/ui";

export function CanvasLayer() {
	const [isDrawing, setIsDrawing] = useState(false);
	const dispatch = useAppDispatch();
	const {
		grid,
		pixelSize,
		numberColumns,
		numberRows,
		columnWidths,
		rowHeights,
	} = useAppSelector((state) => state.canvas);
	const { columnOffsets, rowOffsets } = useAppSelector(selectOffsets);
	const { scale, isPanning, offsets } = useAppSelector(
		(state) => state.viewport
	);
	const { tool } = useAppSelector((state) => state.editor);
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

	const handleDrawing = (event: MouseEvent<HTMLCanvasElement>) => {
		const { offsetX, offsetY } = event.nativeEvent;
		const gridX = Math.floor((offsetX - offsets.x) / pixelSize / scale);
		const gridY = Math.floor((offsetY - offsets.y) / pixelSize / scale);
		if (grid[gridY]?.[gridX] !== undefined) {
			const point = { x: gridX, y: gridY };
			switch (tool) {
				case "eraser":
				case "brush":
					dispatch(drawPixel(point));
					break;
				case "colorPicker":
					dispatch(pickColor(point));
					break;
			}
		}
	};

	function handleMouseDown(event: MouseEvent<HTMLCanvasElement>) {
		if (isPanning) return;
		setIsDrawing(true);
		handleDrawing(event);
	}

	function handleMouseUp() {
		setIsDrawing(false);
	}

	function handleMouseMove(event: MouseEvent<HTMLCanvasElement>) {
		if (isDrawing) {
			handleDrawing(event);
		}
	}

	return (
		<Canvas
			draw={handleDraw}
			style={{
				position: "absolute",
				zIndex: 1,
				top: RULER_SIZE,
				left: RULER_SIZE,
			}}
			width={pixelSize * numberColumns}
			height={pixelSize * numberRows}
			onMouseDown={handleMouseDown}
			onMouseUp={handleMouseUp}
			onMouseMove={handleMouseMove}
			onMouseLeave={handleMouseUp}
		/>
	);
}
