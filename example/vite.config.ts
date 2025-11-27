import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig(({ command }) => {
  const isDev = command === 'serve';
  
  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@micropay/react': resolve(__dirname, '../src'),
      },
    },
    ...(isDev ? {} : {
      build: {
        rollupOptions: {
          input: {
            main: resolve(__dirname, 'index.html'),
            showcase: resolve(__dirname, 'showcase.html'),
          },
        },
      },
    }),
  };
});

