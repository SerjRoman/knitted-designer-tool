import { changeSymbolInGrid, StitchSymbol } from "@/entities/canva";
import { setCurrentSymbolId } from "@/entities/editor";
import { addActionToHistory } from "@/entities/history";
import { createAppAsyncThunk } from "@/shared/store";

interface ChangeSymbolToCustomPayload {
	prevSymbol: StitchSymbol;
	newSymbol: StitchSymbol;
}

export const changeSymbolToCustom = createAppAsyncThunk(
	"features/symbols/changeSymbolToCustom",
	async (payload: ChangeSymbolToCustomPayload, { dispatch, getState }) => {
		const { prevSymbol, newSymbol } = payload;
		if (prevSymbol === newSymbol) return;

		const state = getState();
		const symbols = state.canvas.symbols;
		const prevSymbolId = symbols.indexOf(prevSymbol);

		if (prevSymbolId === -1) return;

		dispatch(changeSymbolInGrid({ symbolToChange: prevSymbol, newSymbol }));

		dispatch(
			addActionToHistory({
				type: "EDIT_SYMBOL",
				payload: {
					symbolBefore: prevSymbol,
					symbolAfter: newSymbol,
				},
			}),
		);
		const nextSymbolId = getState().canvas.symbols.indexOf(newSymbol);
		if (nextSymbolId !== -1) {
			dispatch(setCurrentSymbolId(nextSymbolId));
		}
	},
);
