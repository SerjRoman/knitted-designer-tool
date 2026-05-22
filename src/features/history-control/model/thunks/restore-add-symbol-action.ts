import {
	addSymbol,
	removeSymbol,
	selectSymbols,
} from "@/entities/canva";
import { setCurrentSymbolId } from "@/entities/editor";
import type { AddSymbolActionPayload } from "@/entities/history";
import { createAppAsyncThunk } from "@/shared/store";

export const undoAddSymbolAction = createAppAsyncThunk(
	"history/undoAddSymbolAction",
	(payload: AddSymbolActionPayload, { getState, dispatch }) => {
		const state = getState();
		const symbols = selectSymbols(state);
		const symbolToRemove = payload.symbol;
		const indexToRemove = symbols.indexOf(symbolToRemove);
		let nextSelectedSymbolId = 0;
		if (indexToRemove !== -1) {
			if (indexToRemove === 0) {
				nextSelectedSymbolId = 0;
			} else {
				nextSelectedSymbolId = indexToRemove - 1;
			}
		}
		dispatch(removeSymbol(symbolToRemove));
		dispatch(setCurrentSymbolId(nextSelectedSymbolId));
	},
);

export const redoAddSymbolAction = createAppAsyncThunk(
	"history/redoAddSymbolAction",
	(payload: AddSymbolActionPayload, { getState, dispatch }) => {
		const state = getState();
		const symbols = selectSymbols(state);
		const existingSymbolId = symbols.indexOf(payload.symbol);
		const nextSymbolId =
			existingSymbolId === -1 ? symbols.length : existingSymbolId;
		dispatch(addSymbol(payload.symbol));
		dispatch(setCurrentSymbolId(nextSymbolId));
	},
);
