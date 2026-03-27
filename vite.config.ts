import path from "node:path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";
import { visualizer } from "rollup-plugin-visualizer";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";

const root = path.resolve(__dirname, "src");

export default defineConfig({
    resolve: {
        alias: {
            "@": root,
            "@shared": `${root}/shared`,
            "@app": `${root}/app`,
            "@features": `${root}/features`,
            "@entities": `${root}/entities`,
            "@widgets": `${root}/widgets`,
            "@pages": `${root}/pages`,
            "@assets": `${root}/assets`,
        },
    },
    plugins: [
        react(),
        svgr({ include: `${root}/assets/svg/*.svg` }),
        visualizer({ open: false }),
        tailwindcss(),
    ],
    server: {
        host: "0.0.0.0",
        port: 5173,
        allowedHosts: ["editor.knittedforyou.com"],
    },
    build: {
        outDir: "./dist",
        emptyOutDir: true,
        rollupOptions: {
            output: {
                entryFileNames: `main.js`,
                chunkFileNames: `chunk-[name].js`,
                assetFileNames: `style.css`,
            },
        },
    },
});
