import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react-swc";
import path from "node:path";
import { defineConfig, loadEnv } from "vite";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
	const env = loadEnv(mode, process.cwd(), "");
	return {
		plugins: [react(), TanStackRouterVite()],
		define: {
			"process.env.API_URL": JSON.stringify(env.API_URL),
		},
		resolve: {
			alias: {
				"@": path.resolve(__dirname, "./src"),
			},
		},
		esbuild: {
			target: 'esnext',
			platform: 'neutral',
		  }
	};
});
