import { createSelector } from "@reduxjs/toolkit";
import type { AppStateSchema } from "@/shared/lib";
import { buildOffsets } from "../../lib";

const selectColumnWidths = (state: AppStateSchema) => state.canvas.columnWidths;
const selectRowHeights = (state: AppStateSchema) => state.canvas.rowHeights;

export const selectOffsets = createSelector(
	[selectColumnWidths, selectRowHeights],
	(columnWidths, rowHeights) => {
		return {
			columnOffsets: buildOffsets(columnWidths),
			rowOffsets: buildOffsets(rowHeights),
		};
	}
);
