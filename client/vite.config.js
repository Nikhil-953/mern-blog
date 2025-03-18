import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  server: {
    port: 5173, // Optional: Use a custom port if needed
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // Your backend URL
        changeOrigin: true, // Needed for CORS
        secure: false, // Disable secure SSL checks
      },
    },
  },
  plugins: [react()],
});
