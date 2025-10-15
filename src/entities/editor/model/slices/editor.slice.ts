import { createSlice, nanoid, type PayloadAction } from "@reduxjs/toolkit";
import { COLORS, type Point, type PointWithColor } from "@shared/lib";
import {
	drawingReducers,
	lineReducers,
	rectReducers,
	selectReducers,
	toolInitialStates,
} from "../tools";
import type { Action, EditorState, EditorTools } from "../types";

const initialState: EditorState = {
	toolState: { tool: "brush", strokedPoints: null },
	currentColor: COLORS.black,
	selectedPoints: null,
	clipboard: {
		points: null,
		origin: null,
	},
	history: {
		currentActionId: null,
		undoActions: [],
		redoActions: [],
	},
};

export const editorSlice = createSlice({
	initialState,
	name: "editor",
	reducers: {
		selectTool(state, { payload }: PayloadAction<EditorTools>) {
			state.toolState = toolInitialStates[payload];
		},
		setCurrentColor(state, { payload }: PayloadAction<string>) {
			state.currentColor = payload;
		},
		setClipboardPoints(
			state,
			{ payload }: PayloadAction<PointWithColor[]>
		) {
			state.clipboard.points = payload;
		},
		setClipboardOrigin(state, { payload }: PayloadAction<Point>) {
			state.clipboard.origin = payload;
		},
		clearSelectedPoints(state) {
			state.selectedPoints = null;
		},
		clearClipboard(state) {
			state.clipboard.points = null;
			state.clipboard.origin = null;
		},
		undoAction(state) {
			const { undoActions } = state.history;
			const lastAction = undoActions.pop();
			if (!lastAction) {
				return;
			}
			state.history.redoActions.unshift(lastAction);
			const element = undoActions.at(-1);
			state.history.currentActionId = element ? element.id : null;
		},

		redoAction(state) {
			const { redoActions } = state.history;
			if (redoActions.length === 0) {
				return;
			}
			const actionToRedo = state.history.redoActions.shift();
			if (actionToRedo) {
				state.history.currentActionId = actionToRedo.id;
				state.history.undoActions.push(actionToRedo);
			}
		},
		addActionToHistory(
			state,
			{
				payload,
			}: PayloadAction<{
				pointsBefore: PointWithColor[];
				pointsAfter: PointWithColor[];
			}>
		) {
			const newAction: Action = {
				id: nanoid(),
				toolUsed: state.toolState.tool,
				...payload,
			};

			const currentActionIndex = state.history.undoActions.findIndex(
				(action) => action.id === state.history.currentActionId
			);
			const historyUpToCurrent =
				currentActionIndex === -1
					? state.history.undoActions
					: state.history.undoActions.slice(
							0,
							currentActionIndex + 1
					  );

			state.history.undoActions = [...historyUpToCurrent, newAction];
			state.history.redoActions = [];

			state.history.currentActionId = newAction.id;
		},
		...lineReducers,
		...rectReducers,
		...selectReducers,
		...drawingReducers,
	},
});

export const {
	selectTool,
	setCurrentColor,
	setLineStartPoint,
	setRectStartPoint,
	clearRectState,
	clearLineStartPoint,
	setSelectStartPoint,
	addSelectedPoint,
	removeSelectedPoint,
	clearSelectedPoints,
	setSelectedPoints,
	clearSelectStartPoint,
	setClipboardPoints,
	setClipboardOrigin,
	clearClipboard,
	addActionToHistory,
	undoAction,
	redoAction,
	addStrokedPoint,
	clearStrokedPoints,
} = editorSlice.actions;
