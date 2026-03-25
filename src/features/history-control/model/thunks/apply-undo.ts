import {
	selctUndoActions,
	selectCurrentActionId,
	undoAction,
} from "@/entities/history";
import { createAppAsyncThunk } from "@/shared/store";
import { undoAddColorAction } from "./restore-add-color-action";
import { undoChangePixelDimensions } from "./restore-change-pixel-dimensions";
import { undoDrawAction } from "./restore-draw-action";
import { undoEditColorAction } from "./restore-edit-color-action";
import { undoChangeGridSizesAction } from "./restore-grid-sizes";
import { undoMergeColorAction } from "./restore-merge-color";

export const applyUndo = createAppAsyncThunk(
	"editor/apply-undo-action",
	async (_, { getState, dispatch }) => {
		const state = getState();
		const undoActions = selctUndoActions(state);
		const currentActionId = selectCurrentActionId(state);
		if (undoActions.length === 0) return;
		const currentAction = undoActions.find(
			(action) => action.id === currentActionId,
		);
		if (!currentAction) {
			return;
		}
		switch (currentAction.type) {
			case "DRAW":
				dispatch(undoDrawAction(currentAction.payload));
				break;
			case "ADD_COLOR":
				dispatch(undoAddColorAction(currentAction.payload));
				break;
			case "EDIT_COLOR":
				dispatch(undoEditColorAction(currentAction.payload));
				break;
			case "CHANGE_GRID_DIMENSIONS":
				dispatch(undoChangeGridSizesAction(currentAction.payload));
				break;
			case "CHANGE_PIXEL_DIMENSIONS":
				dispatch(undoChangePixelDimensions(currentAction.payload));
				break;
			case "MERGE_COLOR":
				dispatch(undoMergeColorAction(currentAction.payload));
				break;
			default:
				break;
		}

		dispatch(undoAction());
	},
);
