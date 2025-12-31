import {
	selectGrid,
	selectNumberOfColumns,
	updateGridSizes,
} from "@/entities/canvas";
import { addActionToHistory } from "@/entities/history";
import { createAppAsyncThunk, type PointWithColor } from "@/shared/lib";

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
		const numberOfRows = selectNumberOfColumns(state);
		const grid = selectGrid(state);
		const lostPixels: PointWithColor[] = [];
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
				row.forEach((color, colIndex) => {
					const isOutsideNewRows = rowIndex >= newNumberOfRows;
					const isOutsideNewCols = colIndex >= newNumberOfColumns;

					if (isOutsideNewRows || isOutsideNewCols) {
						lostPixels.push({
							x: colIndex,
							y: rowIndex,
							color: color,
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
			})
		);
		dispatch(updateGridSizes(newSizes));
	}
);
