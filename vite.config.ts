import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '~config': path.resolve(__dirname, './src/config'),
            '~core': path.resolve(__dirname, './src/core'),
            '~layout': path.resolve(__dirname, './src/layout'),
            '~modules': path.resolve(__dirname, './src/modules'),
            '~routers': path.resolve(__dirname, './src/routers'),
            '~css': path.resolve(__dirname, './src/shared/assets/css'),
            '~icon': path.resolve(__dirname, './src/shared/assets/icon'),
            '~svg': path.resolve(__dirname, './src/shared/assets/svg'),
            '~components-ui': path.resolve(__dirname, './src/shared/components/ui'),
            '~components': path.resolve(__dirname, './src/shared/components'),
            '~hook': path.resolve(__dirname, './src/shared/hook'),
            '~utils': path.resolve(__dirname, './src/shared/utils'),
            '~view': path.resolve(__dirname, './src/view'),
        },
    },
});
