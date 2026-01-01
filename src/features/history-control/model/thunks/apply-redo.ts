import { redoAction, selctRedoActions } from "@/entities/history";
import { createAppAsyncThunk } from "@/shared/store";
import { redoAddColorAction } from "./restore-add-color-action";
import { redoChangePixelDimensions } from "./restore-change-pixel-dimensions";
import { redoDrawAction } from "./restore-draw-action";
import { redoEditColorAction } from "./restore-edit-color-action";
import { redoChangeGridSizesAction } from "./restore-grid-sizes";

export const applyRedo = createAppAsyncThunk(
	"editor/apply-redo-action",
	(_, { getState, dispatch }) => {
		const state = getState();
		const redoActions = selctRedoActions(state);
		if (redoActions.length === 0) return;
		const currentAction = redoActions[0];
		if (!currentAction) {
			return;
		}
		switch (currentAction.type) {
			case "DRAW":
				dispatch(redoDrawAction(currentAction.payload));
				break;
			case "ADD_COLOR":
				dispatch(redoAddColorAction(currentAction.payload));
				break;
			case "EDIT_COLOR":
				dispatch(redoEditColorAction(currentAction.payload));
				break;
			case "CHANGE_GRID_DIMENSIONS":
				dispatch(redoChangeGridSizesAction(currentAction.payload));
				break;
			case "CHANGE_PIXEL_DIMENSIONS":
				dispatch(redoChangePixelDimensions(currentAction.payload));
				break;
		}
		dispatch(redoAction());
	}
);
