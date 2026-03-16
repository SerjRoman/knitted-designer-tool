import { createSlice, type PayloadAction } from "@reduxjs/toolkit";



interface ConfigState {
    createUrl: string | null;
    attachUrl: string | null;
    updateUrl: string | null;
    token: string | null;
}

const initialState: ConfigState = {
    createUrl: null,
    attachUrl: null,
    updateUrl: null,

    token: null,
};
export const configSlice = createSlice({
    name: "config",
    initialState,
    reducers: {
        setConfig(
            state,
            { payload }: PayloadAction<ConfigState>,
        ) {
            state.createUrl = payload.createUrl;
            state.attachUrl = payload.attachUrl;
            state.updateUrl = payload.updateUrl;
            state.token = payload.token;
        },
    },
});
export const {
    setConfig,
} = configSlice.actions;
