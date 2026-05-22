import { changeSymbolInGrid } from "@/entities/canva";
import { setCurrentSymbolId } from "@/entities/editor";
import type { EditSymbolActionPayload } from "@/entities/history";
import { createAppAsyncThunk } from "@/shared/store";

export const undoEditSymbolAction = createAppAsyncThunk<
	void,
	EditSymbolActionPayload
>("history/undoEditSymbolAction", (payload, { dispatch, getState }) => {
	const {
		canvas: { symbols },
	} = getState();
	const isEditedSymbolInPalette = symbols.indexOf(payload.symbolAfter);
	if (isEditedSymbolInPalette === -1) return;
	dispatch(
		changeSymbolInGrid({
			symbolToChange: payload.symbolAfter,
			newSymbol: payload.symbolBefore,
		}),
	);
	dispatch(setCurrentSymbolId(isEditedSymbolInPalette));
});

export const redoEditSymbolAction = createAppAsyncThunk<
	void,
	EditSymbolActionPayload
>("history/redoEditSymbolAction", (payload, { dispatch, getState }) => {
	const {
		canvas: { symbols },
	} = getState();
	const isEditedSymbolInPalette = symbols.indexOf(payload.symbolBefore);
	if (isEditedSymbolInPalette === -1) return;
	dispatch(
		changeSymbolInGrid({
			symbolToChange: payload.symbolBefore,
			newSymbol: payload.symbolAfter,
		}),
	);
	dispatch(setCurrentSymbolId(isEditedSymbolInPalette));
});
