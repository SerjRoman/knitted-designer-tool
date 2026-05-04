import {
	selectGrid,
	selectNumberOfColumns,
	selectNumberOfRows,
	updateGridSizes,
} from "@/entities/canva";
import { addActionToHistory } from "@/entities/history";
import { type PointWithCode } from "@/shared/lib";
import { createAppAsyncThunk } from "@/shared/store";

export const resizeGrid = createAppAsyncThunk<
	Promise<void>,
	{
		newNumberOfColumns: number;
		newNumberOfRows: number;
	}
>(
	"resize-grid/resize-grid",
	async ({ newNumberOfColumns, newNumberOfRows }, { getState, dispatch }) => {
		const newSizes = {
			numberOfColumns: newNumberOfColumns,
			numberOfRows: newNumberOfRows,
		};
		const state = getState();
		const numberOfColumns = selectNumberOfColumns(state);
		const numberOfRows = selectNumberOfRows(state);
		const grid = selectGrid(state);
		const lostPixels: PointWithCode[] = [];
		if (
			newNumberOfColumns === numberOfColumns &&
			newNumberOfRows === numberOfRows
		) {
			return;
		}
		if (
			newNumberOfColumns < numberOfColumns ||
			newNumberOfRows < numberOfRows
		) {
			grid.forEach((row, rowIndex) => {
				row.forEach((code, colIndex) => {
					const isOutsideNewRows = rowIndex >= newNumberOfRows;
					const isOutsideNewCols = colIndex >= newNumberOfColumns;

					if (isOutsideNewRows || isOutsideNewCols) {
						lostPixels.push({
							x: colIndex,
							y: rowIndex,
							code,
						});
					}
				});
			});
		}
		dispatch(
			addActionToHistory({
				type: "CHANGE_GRID_DIMENSIONS",
				payload: {
					lostPixels,
					sizesAfter: newSizes,
					sizesBefore: { numberOfColumns, numberOfRows },
				},
			}),
		);
		dispatch(updateGridSizes(newSizes));
	},
);
