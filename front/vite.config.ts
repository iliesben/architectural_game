import * as path from 'path';
import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';

export default defineConfig({
  plugins: [reactRefresh()],
  server: {
    port: 3000
  },
  resolve: {
    alias: [
      {
        find: '@',
        replacement: path.resolve(__dirname, './src'),
      },
    ],
  },
});