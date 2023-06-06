import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
    return {
        build: {
            rollupOptions: {
                input: {
                    main: resolve(__dirname, "index.html"),
                    e200: resolve(__dirname, "200.html"),
                },
            },
        },
        plugins: [react()],
    };
});
