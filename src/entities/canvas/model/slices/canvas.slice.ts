import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import {
	BACKGROUND_COLOR,
	createEmptyGrid,
	createRow,
	createSizesFrom,
	type Grid,
	type Point,
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
}

const initialState: CanvasSlice = {
	grid: createEmptyGrid(INITIAL_ROWS, INITIAL_COLUMNS, BACKGROUND_COLOR),
	backgroundColor: BACKGROUND_COLOR,
	pixelSize: INITIAL_PIXEL_SIZE,
	numberColumns: INITIAL_COLUMNS,
	numberRows: INITIAL_ROWS,
	rowHeights: createSizesFrom(INITIAL_ROWS, INITIAL_PIXEL_SIZE),
	columnWidths: createSizesFrom(INITIAL_COLUMNS, INITIAL_PIXEL_SIZE),
};

export const canvsaSlice = createSlice({
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
		setPixelSize(state, { payload }: PayloadAction<number>) {
			state.pixelSize = payload;
		},
		addRow(state) {
			state.numberRows++;
			state.grid.push(
				createRow(state.backgroundColor, state.numberColumns)
			);
		},
		addColumn(state) {
			state.numberColumns++;
			state.grid = state.grid.map((row) => [
				...row,
				state.backgroundColor,
			]);
		},
		removeRow(state) {
			state.numberRows--;
			state.grid.pop();
		},
		removeColumn(state) {
			state.numberColumns--;
			state.grid.map((row) => {
				return row.pop();
			});
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
} = canvsaSlice.actions;
