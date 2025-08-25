import { useCallback, useMemo, useRef, useState, type MouseEvent } from "react";
import { SelectColor } from "@/features/select-color";
import { ButtonEraser } from "@/features/select-eraser";
import { useCanvasZoom } from "@/features/zoom-canvas";
import { drawPixelGrid, setPixel } from "@/entities/canvas";
import {
	GRID_HEIGHT,
	GRID_WIDTH,
	useAppDispatch,
	useAppSelector,
} from "@/shared/lib";
import { Canvas } from "@/shared/ui";
export function App() {
	const { grid, pixelSize, columnWidths, rowHeights } = useAppSelector(
		(state) => state.canvas
	);
	const [isDrawing, setIsDrawing] = useState<boolean>(false);
	const dispatch = useAppDispatch();
	const ref = useRef<HTMLCanvasElement>(null);
	const columnOffsets = useMemo(() => {
		const arr: number[] = [];
		let accum: number = 0;
		columnWidths.forEach((elem) => {
			arr.push(accum);
			accum += elem;
		});
		return arr;
	}, [columnWidths]);
	const rowOffsets = useMemo(() => {
		const arr: number[] = [];
		let accum: number = 0;
		rowHeights.forEach((elem) => {
			arr.push(accum);
			accum += elem;
		});
		return arr;
	}, [rowHeights]);
	useCanvasZoom(ref);
	const draw = useCallback(
		(context: CanvasRenderingContext2D) => {
			drawPixelGrid(
				context,
				grid,
				pixelSize,
				columnOffsets,
				rowOffsets,
				columnWidths,
				rowHeights
			);
		},
		[columnOffsets, columnWidths, grid, pixelSize, rowHeights, rowOffsets]
	);
	const handleDraw = (event: MouseEvent<HTMLCanvasElement>) => {
		const { offsetX, offsetY } = event.nativeEvent;
		const gridX = Math.floor(offsetX / pixelSize);
		const gridY = Math.floor(offsetY / pixelSize);
		if (grid[gridY] && grid[gridY][gridX] !== undefined) {
			dispatch(setPixel({ x: gridX, y: gridY }));
		}
	};
	function handeMouseDown(event: MouseEvent<HTMLCanvasElement>) {
		setIsDrawing(true);
		handleDraw(event);
	}
	function handleMouseUp() {
		setIsDrawing(false);
	}
	function handleMouseMove(event: MouseEvent<HTMLCanvasElement>) {
		if (!isDrawing) return;
		handleDraw(event);
	}

	return (
		<div style={{ height: "100%" }}>
			<SelectColor />
			<ButtonEraser />
			<Canvas
				draw={draw}
				width={GRID_WIDTH}
				height={GRID_HEIGHT}
				style={{
					cursor: "crosshair",
				}}
				onMouseDown={handeMouseDown}
				onMouseUp={handleMouseUp}
				onMouseLeave={handleMouseUp}
				onMouseMove={handleMouseMove}
				ref={ref}
			></Canvas>
		</div>
	);
}
