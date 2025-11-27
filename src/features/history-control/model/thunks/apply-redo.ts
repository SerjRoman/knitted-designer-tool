import { redoAction } from "@/entities/history";
import { createAppAsyncThunk, type AppStateSchema } from "@/shared/lib";
import { redoAddColorAction } from "./restore-add-color-action";
import { redoDrawAction } from "./restore-draw-action";
import { redoEditColorAction } from "./restore-edit-color-action";
import { redoChangeGridSizesAction } from "./restore-grid-sizes";

export const applyRedo = createAppAsyncThunk(
	"editor/apply-redo-action",
	(_, { getState, dispatch }) => {
		const {
			history: { redoActions },
		} = getState() as AppStateSchema;
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
			case "CHANGE_GRID_SIZES":
				dispatch(redoChangeGridSizesAction(currentAction.payload));
				break;
		}
		dispatch(redoAction());
	}
);
