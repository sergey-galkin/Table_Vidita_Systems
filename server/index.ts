import express from 'express';
import router from './src/router';

const app = express();
app.listen('3001', () => {
  console.log('Server is running on port 3001');
});
router(app);
