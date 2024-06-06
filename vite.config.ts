import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "vue-i18n": "vue-i18n/dist/vue-i18n.cjs.js",
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  base: "/soccer",
  build: {
    chunkSizeWarningLimit: 3000,
  },
  server: {
    host: "0.0.0.0",
    hmr: true,
    port: 5173,
    proxy: {
      "/qiutan": {
        target: "http://192.168.15.22:5000",
        secure: true,
        changeOrigin: true,
        // rewrite: (path: string) => path.replace(/^\/common/, ""),
      },
    },
  },
});
