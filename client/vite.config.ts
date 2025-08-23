import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import path from "path"

// Frontend-only Vite config
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), // alias for src/
    },
  },
  root: ".", // project root = client/
  build: {
    outDir: "dist", // where Vercel will look
    emptyOutDir: true,
  },
  server: {
    open: true, // auto open browser in dev
    port: 5173, // default Vite port
  },
})
