import app from './app.js';
import { env } from './config/env.js';

const PORT = env.PORT || 3000;

app.listen(Number(PORT), '0.0.0.0', () => {
  console.log(`🚀 Server listening on http://0.0.0.0:${PORT} in ${env.NODE_ENV} mode`);
});
