import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface SettingsState {
	showRulers: boolean;
	showCrosshair: boolean;
}

const initialState: SettingsState = {
	showRulers: true,
	showCrosshair: true,
};

export const settingsSlice = createSlice({
	name: "settings",
	initialState,
	selectors: {
		selectShowRulers: (state: SettingsState) => state.showRulers,
		selectShowCrosshair: (state: SettingsState) => state.showCrosshair,
	},
	reducers: {
		toggleRulers: (state) => {
			state.showRulers = !state.showRulers;
		},
		setShowRulers: (state, action: PayloadAction<boolean>) => {
			state.showRulers = action.payload;
		},
        toggleCrosshair: (state) => {
            state.showCrosshair = !state.showCrosshair;
        },
        setShowCrosshair: (state, action: PayloadAction<boolean>) => {
            state.showCrosshair = action.payload;
        },
	},
});

export const { toggleRulers, setShowRulers, toggleCrosshair, setShowCrosshair } = settingsSlice.actions;
export const { selectShowRulers, selectShowCrosshair } = settingsSlice.selectors;
