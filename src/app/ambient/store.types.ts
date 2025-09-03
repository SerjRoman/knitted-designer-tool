import { store } from "@app/store";

export type AppStateSchema = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
