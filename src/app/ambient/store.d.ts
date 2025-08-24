declare module "@shared/lib" {
	import "shared/lib";
	import { store } from "@app/store";

	export type StateSchema = ReturnType<typeof store.getState>;
	export type AppDispatchSchema = typeof store.dispatch;
}
