import { defineConfig } from "vite"
import react from "@vitejs/plugin-react-swc"
import tailwindcss from "tailwindcss"
// @ts-ignore
import { fileURLToPath } from "url"
// @ts-ignore
import * as path from "path"

// Convert the import.meta.url to a path (since __dirname is not available)
// @ts-ignore
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      src: path.resolve(__dirname, "./src"),
    },
  },
  css: {
    postcss: {
      plugins: [tailwindcss],
    },
  },
})
