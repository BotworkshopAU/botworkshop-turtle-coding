import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  base: "./",
  server: {
    port: 5173,
    proxy: {
      "/api": {
        target: "http://127.0.0.1:8787",
        changeOrigin: true,
      },
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        code: resolve(__dirname, "code.html"),
        agenda: resolve(__dirname, "agenda.html"),
        install: resolve(__dirname, "install/index.html"),
      },
    },
  },
});
