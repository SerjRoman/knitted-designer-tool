import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";
import type { Action, ActionInput } from "../types/actions";

interface ActionsHistoryState {
	currentActionId: string | null;
	undoActions: Action[];
	redoActions: Action[];
}

const initialState: ActionsHistoryState = {
	currentActionId: null,
	undoActions: [],
	redoActions: [],
};

export const historySlice = createSlice({
	name: "history",
	initialState: initialState,
	selectors: {
		selctUndoActions: (state) => state.undoActions,
		selctRedoActions: (state) => state.redoActions,
		selectCurrentActionId: (state) => state.currentActionId,
	},
	reducers: {
		undoAction(state) {
			const lastAction = state.undoActions.pop();
			if (!lastAction) {
				return;
			}
			state.redoActions.unshift(lastAction);
			const element = state.undoActions.at(-1);
			state.currentActionId = element ? element.id : null;
		},
		redoAction(state) {
			if (state.redoActions.length === 0) {
				return;
			}
			const actionToRedo = state.redoActions.shift();
			if (actionToRedo) {
				state.currentActionId = actionToRedo.id;
				state.undoActions.push(actionToRedo);
			}
		},
		addActionToHistory(state, { payload }: PayloadAction<ActionInput>) {
			const newAction: Action = {
				id: nanoid(),
				...payload,
			};
			state.undoActions.push(newAction);
			state.redoActions = [];
			state.currentActionId = newAction.id;
		},
	},
});
export const { undoAction, redoAction, addActionToHistory } =
	historySlice.actions;
export const { selctUndoActions, selctRedoActions, selectCurrentActionId } =
	historySlice.selectors;
