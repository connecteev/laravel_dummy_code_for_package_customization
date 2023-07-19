// KEENBRAIN PACKAGE'S VITE CONFIG
import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import vue from '@vitejs/plugin-vue';

// For vite config
// See https://www.youtube.com/watch?v=L23bAMdgOZA
// Also see https://youtu.be/VAeRhmpcWEQ?t=3895
// See https://warrickbayman.medium.com/laravel-vue-and-inertia-with-vite-4b8b825b790a
// Note: defineConfig helps with Intellisense
export default defineConfig({
    // build: {
    //     // outDir: 'public', // Set the desired output directory
    //     // sourcemap: true,
    //     emptyOutDir: true,
    //     rollupOptions: {
    //         output: {
    //             // entryFileNames: "[name].[hash].js",
    //             // chunkFileNames: "[name].[hash].js",
    //             // assetFileNames: "[name].[hash].[ext]",
    //             entryFileNames: "[name].js",
    //             chunkFileNames: "[name].js",
    //             assetFileNames: "[name].[ext]",
    //         }
    //     },
    // },
    plugins: [
        laravel({
            input: [
                'resources/js/app.js',
                'resources/css/app.css',
            ],
            ssr: 'resources/js/ssr.js',
            refresh: true,
        }),
        vue({
            template: {
                transformAssetUrls: {
                    base: null,
                    includeAbsolute: false,
                },
            },
        }),
    ],
});
