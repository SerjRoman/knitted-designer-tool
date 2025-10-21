import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import {
	BACKGROUND_COLOR,
	COLORS,
	createEmptyGrid,
	createRow,
	createSizesFrom,
	type Grid,
	type Point,
	type PointWithColor,
} from "@/shared/lib";
import {
	INITIAL_COLUMNS,
	INITIAL_PIXEL_SIZE,
	INITIAL_ROWS,
} from "../constants";

interface CanvasSlice {
	grid: Grid;
	backgroundColor: string;
	pixelSize: number;
	numberColumns: number;
	numberRows: number;
	rowHeights: number[];
	columnWidths: number[];
	colors: string[];
}

const initialState: CanvasSlice = {
	grid: createEmptyGrid(INITIAL_COLUMNS, INITIAL_ROWS, BACKGROUND_COLOR),
	backgroundColor: BACKGROUND_COLOR,
	pixelSize: INITIAL_PIXEL_SIZE,
	numberColumns: INITIAL_COLUMNS,
	numberRows: INITIAL_ROWS,
	rowHeights: createSizesFrom(INITIAL_ROWS, INITIAL_PIXEL_SIZE),
	columnWidths: createSizesFrom(INITIAL_COLUMNS, INITIAL_PIXEL_SIZE),
	colors: Object.values(COLORS),
};

export const canvasSlice = createSlice({
	initialState,
	name: "canvas",
	reducers: {
		setBackgroundColor(state, { payload }: PayloadAction<string>) {
			state.backgroundColor = payload;
		},
		setPixel(
			state,
			{
				payload: {
					point: { x, y },
					color,
				},
			}: PayloadAction<{ point: Point; color: string }>
		) {
			if (state.grid[y] && state.grid[y][x] !== undefined) {
				state.grid[y][x] = color;
			}
		},
		setPixels(
			state,
			{
				payload,
			}: PayloadAction<{
				points: Point[];
				color: string;
			}>
		) {
			payload.points.forEach((point) => {
				const { x, y } = point;
				if (state.grid[y] && state.grid[y][x] !== undefined) {
					state.grid[y][x] = payload.color;
				}
			});
		},
		setPixelsWithColor(
			state,
			{
				payload,
			}: PayloadAction<{
				points: PointWithColor[];
			}>
		) {
			payload.points.forEach((point) => {
				const { x, y } = point;
				if (state.grid[y] && state.grid[y][x] !== undefined) {
					state.grid[y][x] = point.color;
				}
			});
		},
		setPixelSize(state, { payload }: PayloadAction<number>) {
			state.pixelSize = payload;
			state.rowHeights = createSizesFrom(state.numberRows, payload);
			state.columnWidths = createSizesFrom(state.numberColumns, payload);
		},
		addRow(state) {
			state.numberRows++;
			state.grid.push(
				createRow(state.backgroundColor, state.numberColumns)
			);
			state.rowHeights.push(state.pixelSize);
		},
		addColumn(state) {
			state.numberColumns++;
			state.grid = state.grid.map((row) => [
				...row,
				state.backgroundColor,
			]);
			state.columnWidths.push(state.pixelSize);
		},
		removeRow(state) {
			state.numberRows--;
			state.grid.pop();
			state.rowHeights.pop();
		},
		removeColumn(state) {
			state.numberColumns--;
			state.grid.map((row) => {
				return row.pop();
			});
			state.columnWidths.pop();
		},
		updateGridSizes(
			state,
			{
				payload,
			}: PayloadAction<{ numberOfRows: number; numberOfColumns: number }>
		) {
			const { numberOfRows, numberOfColumns } = payload;
			state.numberColumns = numberOfColumns;
			state.numberRows = numberOfRows;
			state.columnWidths = createSizesFrom(
				numberOfColumns,
				state.pixelSize
			);
			state.rowHeights = createSizesFrom(numberOfRows, state.pixelSize);
			const newGrid = createEmptyGrid(
				numberOfColumns,
				numberOfRows,
				state.backgroundColor
			).map((row, indexY) => {
				if (indexY > state.grid.length) return row;
				return row.map((cell, indexX) => {
					if (
						state.grid[indexY] &&
						indexX < state.grid[indexY].length
					) {
						return state.grid[indexY][indexX];
					}
					return cell;
				});
			});
			state.grid = newGrid;
		},
		addColor(state, { payload }: PayloadAction<string>) {
			if (state.colors.includes(payload)) return;
			state.colors.push(payload);
		},
		changeColorInGrid(
			state,
			{
				payload,
			}: PayloadAction<{ colorToChange: string; newColor: string }>
		) {
			const { colorToChange, newColor } = payload;
			const colorInArrayIndex = state.colors.findIndex(
				(color) => color === colorToChange
			);
			if (colorInArrayIndex === -1) return;
			state.colors.splice(colorInArrayIndex, 1, newColor);

			for (let y = 0; y < state.grid.length; y++) {
				for (let x = 0; x < state.grid[y].length; x++) {
					const color = state.grid[y][x];
					if (color !== colorToChange) continue;
					state.grid[y][x] = newColor;
				}
			}
		},
		applyFlip(
			state,
			{
				payload,
			}: PayloadAction<{
				pixelsToClear: Point[];
				pixelsToApply: PointWithColor[];
			}>
		) {
			const { pixelsToClear, pixelsToApply } = payload;

			for (const point of pixelsToClear) {
				const { x, y } = point;
				if (state.grid[y]?.[x] !== undefined) {
					state.grid[y][x] = state.backgroundColor;
				}
			}
			for (const { x, y, color } of pixelsToApply) {
				if (state.grid[y]?.[x] !== undefined) {
					state.grid[y][x] = color;
				}
			}
		},
		setGrid(state, { payload }: PayloadAction<Grid>) {
			state.grid = payload;
			const setColors = new Set<string>();
			payload.forEach((row) => {
				row.forEach((cell) => {
					if (!setColors.has(cell)) {
						setColors.add(cell);
					}
				});
			});
			const colors: string[] = Array.from(setColors);
			state.colors = colors;
		},
		setColors(state, { payload }: PayloadAction<string[]>) {
			state.colors = payload;
		},
	},
});

export const {
	setBackgroundColor,
	setPixel,
	setPixelSize,
	addRow,
	removeRow,
	addColumn,
	removeColumn,
	updateGridSizes,
	setPixels,
	setPixelsWithColor,
	addColor,
	changeColorInGrid,
	applyFlip,
	setGrid,
	setColors,
} = canvasSlice.actions;
