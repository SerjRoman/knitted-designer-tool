import { createSlice, type PayloadAction } from "@reduxjs/toolkit";



interface ConfigState {
    createUrl: string | null;
    attachUrl: string | null;
    token: string | null;
}

const initialState: ConfigState = {
    createUrl: null,
    attachUrl: null,

    token: null,
};
export const configSlice = createSlice({
    name: "config",
    initialState,
    reducers: {
        setConfig(
            state,
            { payload }: PayloadAction<Omit<ConfigState, "product">>,
        ) {
            state.createUrl = payload.createUrl;
            state.attachUrl = payload.attachUrl;
            state.token = payload.token;
        },
    },
});
export const {
    setConfig,
} = configSlice.actions;
