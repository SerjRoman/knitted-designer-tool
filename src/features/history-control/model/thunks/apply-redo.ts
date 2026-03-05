import { createAsyncThunk } from "@reduxjs/toolkit";
import { setPixelsWithColor } from "@/entities/canvas";
import { redoAction } from "@/entities/editor";
import type { AppStateSchema } from "@/shared/lib";

export const applyRedo = createAsyncThunk(
	"editor/apply-redo-action",
	(_, { getState, dispatch }) => {
		const {
			editor: {
				history: { redoActions },
			},
		} = getState() as AppStateSchema;
		if (redoActions.length === 0) return;
		const currentAction = redoActions[0];
		if (!currentAction) {
			return;
		}
		dispatch(setPixelsWithColor({ points: currentAction.pointsAfter }));
		dispatch(redoAction());
	}
);
