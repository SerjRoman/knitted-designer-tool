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
	type PointWithCode,
} from "@/shared/lib";
import { calculateTension } from "../../lib";
import {
	decodeColorId,
	decodeSymbolId,
	encodeCellCode,
	replaceColorId,
} from "../cell-codec";
import {
	CANVAS_HEIGHT,
	CANVAS_WIDTH,
	INITIAL_COLUMNS,
	INITIAL_PIXEL_SIZE,
	INITIAL_ROWS,
	INITIAL_TENSION_ROWS,
	INITIAL_TENSION_STITCHES,
} from "../constants";
import type { CellCode } from "../types";

interface CanvasSlice {
	grid: Grid;
	canvasDimensions: { width: number; height: number };
	backgroundColorId: number;
	pixelSize: number;
	numberOfColumns: number;
	numberOfRows: number;
	pixelWidth: number;
	pixelHeight: number;
	colors: string[];
	symbols: string[];
}
export const INITIAL_TENSION = calculateTension(
	INITIAL_TENSION_STITCHES,
	INITIAL_TENSION_ROWS,
	10,
);

function resolveColorId(colors: string[], color: string): number {
	const colorId = colors.indexOf(color);
	return colorId === -1 ? 0 : colorId;
}

function getBackgroundCode(state: CanvasSlice): CellCode {
	return encodeCellCode({
		colorId: state.backgroundColorId,
		symbolId: 0,
	});
}

const initialState: CanvasSlice = {
	grid: createEmptyGrid(
		INITIAL_COLUMNS,
		INITIAL_ROWS,
		encodeCellCode({
			colorId: resolveColorId(Object.values(COLORS), BACKGROUND_COLOR),
			symbolId: 0,
		}),
	),
	backgroundColorId: resolveColorId(Object.values(COLORS), BACKGROUND_COLOR),
	pixelSize: INITIAL_PIXEL_SIZE,
	numberOfColumns: INITIAL_COLUMNS,
	numberOfRows: INITIAL_ROWS,
	pixelWidth: INITIAL_TENSION.width,
	pixelHeight: INITIAL_TENSION.height,
	colors: Object.values(COLORS),
	symbols: [""],
	canvasDimensions: { height: CANVAS_HEIGHT, width: CANVAS_WIDTH },
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
			}),
		),
		selectNumberOfColumns: (state) => state.numberOfColumns,
		selectNumberOfRows: (state) => state.numberOfRows,
		selectGrid: (state) => state.grid,
		selectPixelWidth: (state) => state.pixelWidth,
		selectPixelHeight: (state) => state.pixelHeight,
		selectPixelSize: (state) => state.pixelSize,
		selectBackgroundColorId: (state) => state.backgroundColorId,
		selectBackgroundColor: (state) =>
			state.colors[state.backgroundColorId] ?? BACKGROUND_COLOR,
		selectCanvasDimensions: (state) => state.canvasDimensions,
		selectColors: (state) => state.colors,
		selectSymbols: (state) => state.symbols,
	},
	reducers: {
		setBackgroundColorId(state, { payload }: PayloadAction<number>) {
			state.backgroundColorId = payload;
		},
		setCanvasDimensions(
			state,
			{ payload }: PayloadAction<{ width: number; height: number }>,
		) {
			state.canvasDimensions = payload;
		},
		setPixel(
			state,
			{
				payload: {
					point: { x, y },
					code,
				},
			}: PayloadAction<{ point: Point; code: CellCode }>,
		) {
			if (state.grid[y]?.[x] !== undefined) {
				state.grid[y][x] = code;
			}
		},
		setPixels(
			state,
			{
				payload,
			}: PayloadAction<{
				points: Point[];
				code: CellCode;
			}>,
		) {
			payload.points.forEach((point) => {
				const { x, y } = point;
				if (state.grid[y]?.[x] !== undefined) {
					state.grid[y][x] = payload.code;
				}
			});
		},
		setPixelsWithCode(
			state,
			{
				payload,
			}: PayloadAction<{
				points: PointWithCode[];
			}>,
		) {
			payload.points.forEach((point) => {
				const { x, y } = point;
				if (state.grid[y]?.[x] !== undefined) {
					state.grid[y][x] = point.code;
				}
			});
		},
		setPixelSize(state, { payload }: PayloadAction<number>) {
			state.pixelSize = payload;
		},
		setPixelDimensions(
			state,
			{ payload }: PayloadAction<{ width: number; heigth: number }>,
		) {
			state.pixelWidth = payload.width;
			state.pixelHeight = payload.heigth;
		},
		addRow(state) {
			state.numberOfRows++;
			state.grid.push(
				createRow(getBackgroundCode(state), state.numberOfColumns),
			);
		},
		addColumn(state) {
			state.numberOfColumns++;
			const backgroundCode = getBackgroundCode(state);
			state.grid = state.grid.map((row) => [...row, backgroundCode]);
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
			}: PayloadAction<{ numberOfRows: number; numberOfColumns: number }>,
		) {
			const { numberOfRows, numberOfColumns } = payload;
			state.numberOfColumns = numberOfColumns;
			state.numberOfRows = numberOfRows;
			const newGrid = createEmptyGrid(
				numberOfColumns,
				numberOfRows,
				getBackgroundCode(state),
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
			}: PayloadAction<{ colorToChange: string; newColor: string }>,
		) {
			const { colorToChange, newColor } = payload;
			const colorToChangeId = state.colors.indexOf(colorToChange);
			if (colorToChangeId === -1) return;
			const newColorId = state.colors.indexOf(newColor);
			if (newColorId === -1) {
				state.colors.splice(colorToChangeId, 1, newColor);
				return;
			}

			for (let y = 0; y < state.grid.length; y++) {
				for (let x = 0; x < state.grid[y].length; x++) {
					const cellCode = state.grid[y][x];
					if (decodeColorId(cellCode) !== colorToChangeId) continue;
					state.grid[y][x] = replaceColorId(cellCode, newColorId);
				}
			}
		},
		applyFlip(
			state,
			{
				payload,
			}: PayloadAction<{
				pixelsToClear: Point[];
				pixelsToApply: PointWithCode[];
			}>,
		) {
			const { pixelsToClear, pixelsToApply } = payload;
			const backgroundCode = getBackgroundCode(state);

			for (const point of pixelsToClear) {
				const { x, y } = point;
				if (state.grid[y]?.[x] !== undefined) {
					state.grid[y][x] = backgroundCode;
				}
			}
			for (const { x, y, code } of pixelsToApply) {
				if (state.grid[y]?.[x] !== undefined) {
					state.grid[y][x] = code;
				}
			}
		},
		setGrid(state, { payload }: PayloadAction<Grid>) {
			state.grid = payload;
		},
		setColors(state, { payload }: PayloadAction<string[]>) {
			const oldColors = [...state.colors];
			const fallbackColorId =
				state.backgroundColorId < payload.length
					? state.backgroundColorId
					: 0;
			for (let y = 0; y < state.grid.length; y++) {
				for (let x = 0; x < state.grid[y].length; x++) {
					const cellCode = state.grid[y][x];
					const oldColorId = decodeColorId(cellCode);
					const color = oldColors[oldColorId];
					const mappedColorId = color
						? payload.indexOf(color)
						: fallbackColorId;
					const nextColorId =
						mappedColorId === -1 ? fallbackColorId : mappedColorId;
					state.grid[y][x] = replaceColorId(cellCode, nextColorId);
				}
			}
			state.colors = payload;
			if (state.backgroundColorId >= payload.length) {
				state.backgroundColorId = 0;
			}
		},
		removeColor(state, { payload }: PayloadAction<string>) {
			const colorToRemoveId = state.colors.indexOf(payload);
			if (colorToRemoveId === -1) return;
			state.colors = state.colors.filter((color) => color !== payload);
			if (state.backgroundColorId === colorToRemoveId) {
				state.backgroundColorId = 0;
			} else if (state.backgroundColorId > colorToRemoveId) {
				state.backgroundColorId--;
			}
			const fallbackColorId = state.backgroundColorId;
			for (let y = 0; y < state.grid.length; y++) {
				for (let x = 0; x < state.grid[y].length; x++) {
					const cellCode = state.grid[y][x];
					const colorId = decodeColorId(cellCode);
					if (colorId === colorToRemoveId) {
						state.grid[y][x] = replaceColorId(
							cellCode,
							fallbackColorId,
						);
						continue;
					}
					if (colorId > colorToRemoveId) {
						state.grid[y][x] = replaceColorId(
							cellCode,
							colorId - 1,
						);
					}
				}
			}
		},
		addSymbol(state, { payload }: PayloadAction<string>) {
			if (state.symbols.includes(payload)) return;
			state.symbols.push(payload);
		},
		setSymbols(state, { payload }: PayloadAction<string[]>) {
			const symbols = payload.length > 0 ? payload : [""];
			state.symbols = symbols;
			for (let y = 0; y < state.grid.length; y++) {
				for (let x = 0; x < state.grid[y].length; x++) {
					const cellCode = state.grid[y][x];
					const symbolId = decodeSymbolId(cellCode);
					if (symbolId < symbols.length) continue;
					state.grid[y][x] = encodeCellCode({
						colorId: decodeColorId(cellCode),
						symbolId: 0,
					});
				}
			}
		},
	},
});

export const {
	setBackgroundColorId,
	setPixel,
	setPixelSize,
	addRow,
	removeRow,
	addColumn,
	removeColumn,
	updateGridSizes,
	setPixels,
	setPixelsWithCode,
	addColor,
	addSymbol,
	changeColorInGrid,
	applyFlip,
	setGrid,
	setColors,
	setSymbols,
	removeColor,
	setPixelDimensions,
	setCanvasDimensions,
} = canvasSlice.actions;
export const {
	selectPixelDimensions,
	selectNumberOfColumns,
	selectNumberOfRows,
	selectGrid,
	selectPixelHeight,
	selectPixelSize,
	selectBackgroundColorId,
	selectPixelWidth,
	selectBackgroundColor,
	selectCanvasDimensions,
	selectColors,
	selectSymbols,
} = canvasSlice.selectors;
