import { defineConfig } from "vite";

export default defineConfig({
    build: {
        lib: {
            entry: "src/index.js",
            name: "JsonToSqlSP",
            fileName: (format) => `json-to-sql-sp.${format}.js`,
        },
        rollupOptions: {
            external: [],
            output: {
                globals: {
                    JsonToSqlSP: 'JsonToSqlSP',
                },
            },
        },
    },
});
