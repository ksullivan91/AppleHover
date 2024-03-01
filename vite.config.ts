import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(), // Enables Vite to handle React files
    dts({
      insertTypesEntry: true,
    }),
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'), // Entry file
      name: 'appleHover', // Global variable, used in UMD builds
      fileName: (format) => `appleHover.${format}.js`,
    },
    rollupOptions: {
      // Externalize peer dependencies
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
    outDir: 'dist', // Output directory
    sourcemap: true, // Optional: Generates source maps
  },
});
