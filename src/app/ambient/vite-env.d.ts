/// <reference types="vite/client" />
/// <reference types="./assets.d.ts" />
/// <reference types="./store.d.ts" />

interface ImportMetaEnv {
	readonly ORIGIN_PRESTA: string;
}
interface ImportMeta {
	readonly env: ImportMetaEnv;
}
