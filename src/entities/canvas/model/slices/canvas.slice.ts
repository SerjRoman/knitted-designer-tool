import {
	createSelector,
	createSlice,
	type PayloadAction,
} from "@reduxjs/toolkit";
import {
	BACKGROUND_COLOR,
	COLORS,
	createEmptyGrid,
	createRow,
	type Grid,
	type Point,
	type PointWithColor,
} from "@/shared/lib";
import { calculateTension } from "../../lib";
import {
	INITIAL_COLUMNS,
	INITIAL_PIXEL_SIZE,
	INITIAL_ROWS,
	INITIAL_TENSION_ROWS,
	INITIAL_TENSION_STITCHES,
} from "../constants";

interface CanvasSlice {
	grid: Grid;
	backgroundColor: string;
	pixelSize: number;
	numberOfColumns: number;
	numberOfRows: number;
	pixelWidth: number;
	pixelHeight: number;
	colors: string[];
}
export const INITIAL_TENSION = calculateTension(
	INITIAL_TENSION_STITCHES,
	INITIAL_TENSION_ROWS,
	10
);

const initialState: CanvasSlice = {
	grid: createEmptyGrid(INITIAL_COLUMNS, INITIAL_ROWS, BACKGROUND_COLOR),
	backgroundColor: BACKGROUND_COLOR,
	pixelSize: INITIAL_PIXEL_SIZE,
	numberOfColumns: INITIAL_COLUMNS,
	numberOfRows: INITIAL_ROWS,
	pixelWidth: INITIAL_TENSION.width,
	pixelHeight: INITIAL_TENSION.height,
	colors: Object.values(COLORS),
};

export const canvasSlice = createSlice({
	initialState,
	name: "canvas",
	selectors: {
		selectPixelDimensions: createSelector(
			[
				(state: CanvasSlice) => state.pixelSize,
				(state: CanvasSlice) => state.pixelWidth,
				(state: CanvasSlice) => state.pixelHeight,
			],
			(size, w, h) => ({
				width: size * w,
				height: size * h,
			})
		),
		selectNumberOfColumns: (state) => state.numberOfColumns,
		selectNumberOfRows: (state) => state.numberOfRows,
		selectGrid: (state) => state.grid,
		selectPixelWidth: (state) => state.pixelWidth,
		selectPixelHeight: (state) => state.pixelHeight,
		selectPixelSize: (state) => state.pixelSize,
	},
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
			if (state.grid[y]?.[x]) {
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
				if (state.grid[y]?.[x]) {
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
				if (state.grid[y]?.[x]) {
					state.grid[y][x] = point.color;
				}
			});
		},
		setPixelSize(state, { payload }: PayloadAction<number>) {
			state.pixelSize = payload;
		},
		setPixelDimensions(
			state,
			{ payload }: PayloadAction<{ width: number; heigth: number }>
		) {
			state.pixelWidth = payload.width;
			state.pixelHeight = payload.heigth;
		},
		addRow(state) {
			state.numberOfRows++;
			state.grid.push(
				createRow(state.backgroundColor, state.numberOfColumns)
			);
		},
		addColumn(state) {
			state.numberOfColumns++;
			state.grid = state.grid.map((row) => [
				...row,
				state.backgroundColor,
			]);
		},
		removeRow(state) {
			state.numberOfRows--;
			state.grid.pop();
		},
		removeColumn(state) {
			state.numberOfColumns--;
			state.grid.forEach((row) => {
				return row.pop();
			});
		},
		updateGridSizes(
			state,
			{
				payload,
			}: PayloadAction<{ numberOfRows: number; numberOfColumns: number }>
		) {
			const { numberOfRows, numberOfColumns } = payload;
			state.numberOfColumns = numberOfColumns;
			state.numberOfRows = numberOfRows;
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
			if (!state.colors.includes(newColor)) {
				state.colors.splice(colorInArrayIndex, 1, newColor);
			}

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
		removeColor(state, { payload }: PayloadAction<string>) {
			state.colors = state.colors.filter((color) => color !== payload);
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
	removeColor,
	setPixelDimensions,
} = canvasSlice.actions;
export const {
	selectPixelDimensions,
	selectNumberOfColumns,
	selectNumberOfRows,
	selectGrid,
	selectPixelHeight,
	selectPixelSize,
	selectPixelWidth,
} = canvasSlice.selectors;
