import { cleanEnv } from "envalid";

export const env = cleanEnv(import.meta.env, {});
