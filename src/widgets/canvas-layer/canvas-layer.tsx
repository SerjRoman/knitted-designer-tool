import { useCallback, useState, type MouseEvent } from "react";
import { drawPixel } from "@/features/draw-pixel";
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
	const handleDraw = useCallback(
		(context: CanvasRenderingContext2D) => {
			drawPixelLayer(
				context,
				grid,
				columnOffsets,
				rowOffsets,
				columnWidths,
				rowHeights
			);
		},
		[columnOffsets, columnWidths, grid, rowHeights, rowOffsets]
	);

	const handleDrawing = (event: MouseEvent<HTMLCanvasElement>) => {
		const { offsetX, offsetY } = event.nativeEvent;
		const gridX = Math.floor(offsetX / pixelSize);
		const gridY = Math.floor(offsetY / pixelSize);
		if (grid[gridY]?.[gridX] !== undefined) {
			dispatch(drawPixel({ x: gridX, y: gridY }));
		}
	};

	function handleMouseDown(event: MouseEvent<HTMLCanvasElement>) {
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
