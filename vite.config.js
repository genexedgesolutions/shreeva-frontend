/* eslint-disable no-undef */
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern-compiler", // or "modern"
        silenceDeprecations: ["import", "global-builtin"],
      },
    },
  },
  esbuild: {
    target: 'esnext', // Use 'esnext' to enable top-level await
  },
  build: {
    target: 'esnext',
    minify: false, // Optional - Debug ke liye minify disable kar do
  },
});
