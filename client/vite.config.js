export default defineConfig({
  server: {  // ✅ Correct spelling
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,  // Add this to prevent CORS issues
        secure: false,
      },
    },
  },
  plugins: [react()],
});
