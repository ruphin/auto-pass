import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";

const root = fileURLToPath(new URL(".", import.meta.url));

const license = `/**
 * @license
 * MIT License
 *
 * Copyright (c) 2019 Goffert van Gool
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */`;

export default defineConfig(({ mode }) => {
  // `vite build --mode lib` bundles auto-pass.js into dist/auto-pass.js (ESM)
  // and dist/auto-pass.es5.js (IIFE), alongside the built demo site.
  if (mode === "lib") {
    return {
      build: {
        outDir: resolve(root, "dist"),
        emptyOutDir: false,
        minify: false,
        target: "es2015",
        lib: {
          entry: resolve(root, "auto-pass.js"),
          name: "AutoPass",
          formats: ["es", "iife"],
          fileName: format =>
            format === "es" ? "auto-pass.js" : "auto-pass.es5.js"
        },
        rollupOptions: {
          output: { banner: license }
        }
      }
    };
  }

  // Default: dev server / build / preview for the demo site.
  return {
    root: resolve(root, "demo"),
    server: { port: 5000 },
    preview: { port: 5000 },
    build: {
      outDir: resolve(root, "dist"),
      emptyOutDir: true,
      rollupOptions: {
        input: {
          main: resolve(root, "demo/index.html"),
          success: resolve(root, "demo/success/index.html")
        }
      }
    }
  };
});
