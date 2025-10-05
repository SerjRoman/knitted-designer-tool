import { createAsyncThunk } from "@reduxjs/toolkit";
import { setPixelsWithColor } from "@/entities/canvas";
import { undoAction } from "@/entities/editor";
import type { AppStateSchema } from "@/shared/lib";

export const applyUndo = createAsyncThunk(
	"editor/apply-undo-action",
	(_, { getState, dispatch }) => {
		const {
			editor: {
				history: { undoActions, currentActionId },
			},
		} = getState() as AppStateSchema;
		if (undoActions.length === 0) return;
		const currentAction = undoActions.find((a) => a.id === currentActionId);
		if (!currentAction) {
			return;
		}
		dispatch(setPixelsWithColor({ points: currentAction.pointsBefore }));
		dispatch(undoAction());
	}
);
