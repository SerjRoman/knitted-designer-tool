import { undoAction } from "@/entities/history";
import { createAppAsyncThunk, type AppStateSchema } from "@/shared/lib";
import { undoAddColorAction } from "./restore-add-color-action";
import { undoDrawAction } from "./restore-draw-action";
import { undoEditColorAction } from "./restore-edit-color-action";
import { undoChangeGridSizesAction } from "./restore-grid-sizes";

export const applyUndo = createAppAsyncThunk(
	"editor/apply-undo-action",
	async (_, { getState, dispatch }) => {
		const {
			history: { undoActions, currentActionId },
		} = getState() as AppStateSchema;
		if (undoActions.length === 0) return;
		const currentAction = undoActions.find(
			(action) => action.id === currentActionId
		);
		if (!currentAction) {
			return;
		}
		switch (currentAction.type) {
			case "DRAW":
				await dispatch(undoDrawAction(currentAction.payload));
				break;
			case "ADD_COLOR":
				await dispatch(undoAddColorAction(currentAction.payload));
				break;
			case "EDIT_COLOR":
				await dispatch(undoEditColorAction(currentAction.payload));
				break;
			case "CHANGE_GRID_SIZES":
				await dispatch(
					undoChangeGridSizesAction(currentAction.payload)
				);
				break;
		}

		dispatch(undoAction());
	}
);
