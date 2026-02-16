import { cleanEnv, str } from "envalid";

export const ENV = cleanEnv(import.meta.env, {
	VITE_ORIGIN_PRESTA: str(),
});
