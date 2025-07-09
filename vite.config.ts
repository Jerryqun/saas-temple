import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
	root: "./",
	// base: "api", // 默认
	// publicDir: "./public", // // 默认
	plugins: [react()],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
	// server: {
	// 	host: "localhost",
	// 	port: 9999,
	// 	proxy: {},
	// },
});
