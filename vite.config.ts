import path from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import vitePluginHtml from 'vite-plugin-html';
import legacy from '@vitejs/plugin-legacy';

import projectConfig from './src/config/project.json';

// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        alias: {
            "~/": `${path.resolve(__dirname, "src")}/`,
            "@/": `${path.resolve(__dirname, "src")}/`,
        },
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `@use "~/styles/element/index.scss" as *;`,
            },
        },
    },
    plugins: [
        vue(),
        vitePluginHtml({
            inject: {
                injectData: {
                    title: projectConfig.title,
                    hash: Date.now(),
                },
            },
        }),
        Components({
            resolvers: [
                ElementPlusResolver({
                    importStyle: "sass",
                }),
            ],
        }),
        legacy({
            targets: ['defaults', /*'not IE 11'*/, 'ie 8'],
        }),
    ],
    server: {
        port: 8081,
        https: true,
    },
});
