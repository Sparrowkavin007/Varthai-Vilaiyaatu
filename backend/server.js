require('dotenv').config();
const app = require('./app');
const connectDB = require('./config/db');
const redisClient = require('./config/redis');

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  app.listen(PORT, () => {
    console.log(`🚀 [Economics MCQ Game Server] running on http://localhost:${PORT}`);
  });

  connectDB();
  try {
    await redisClient.connect();
  } catch (err) {
    console.warn('[Redis Connect Note]: Continuing without Redis or in lazy mode.');
  }
};

startServer();
