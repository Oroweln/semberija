// server.js
(async () => {
  try {
    await import('./index.js');
  } catch (err) {
    console.error('Failed to start app:', err);
    process.exit(1);
  }
})();