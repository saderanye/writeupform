import { defineConfig } from 'vite';
import { resolve } from 'path';
import type { UserConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
    base: './',
    clearScreen: false,
    plugins: [
        tsconfigPaths()
    ],
    server: {
        port: 3000,
        strictPort: true
    },
    preview: {
        port: 3000,
        strictPort: true
    },
    build: {
        target: 'esnext',
        minify: true,
        sourcemap: true,
        emptyOutDir: true,
        reportCompressedSize: false,
        lib: {
            entry: resolve(__dirname, './index.html'),
            formats: ['es']
        }
    }
} as UserConfig);

