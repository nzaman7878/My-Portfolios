import app from './app.js';
import { env } from './config/env.js';
import { connectDB } from './db/mongodb.js';

const PORT = env.PORT || 3000;

connectDB().then(() => {
  app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`🚀 Server listening on http://0.0.0.0:${PORT} in ${env.NODE_ENV} mode`);
  });
}).catch(err => {
  console.error('Failed to connect to database', err);
  process.exit(1);
});
