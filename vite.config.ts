import path from "path";
import react from "@vitejs/plugin-react-swc";
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
	plugins: [react(), svgr({ include: `${root}/assets/svg/*.svg` })],
	server: {
    	host: '0.0.0.0',                   // allow external connections
    	port: 5173,                        
    	allowedHosts: ['editor.knittedforyou.com'], 
  	}
});
