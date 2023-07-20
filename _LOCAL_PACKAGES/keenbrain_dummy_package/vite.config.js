// MAIN APP'S VITE CONFIG
import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import vue from '@vitejs/plugin-vue';
import path from 'path';

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
        laravel([
            'resources/js/app.js',

            // Per https://laravel.com/docs/10.x/vite#configuring-vite
            // If you are building an SPA, including applications built using Inertia, Vite works best without CSS entry points:
            // Instead, you should import your CSS via JavaScript. Typically, this would be done in your application's resources/js/app.js file
            // 'resources/css/keenbrain.css',
        ]),
        vue({
            template: {
                transformAssetUrls: {
                    // The Vue plugin will re-write asset URLs, when referenced
                    // in Single File Components, to point to the Laravel web
                    // server. Setting this to `null` allows the Laravel plugin
                    // to instead re-write asset URLs to point to the Vite
                    // server instead.
                    base: null,

                    // The Vue plugin will parse absolute URLs and treat them
                    // as absolute paths to files on disk. Setting this to
                    // `false` will leave absolute URLs un-touched so they can
                    // reference assets in the public directory as expected.
                    includeAbsolute: false,
                },
            },
        }),
    ],
    // resolve: {
    //     alias: {
    //         '/@components': path.resolve(__dirname, './resources/js/Components'),
    //     },
    // },
});
