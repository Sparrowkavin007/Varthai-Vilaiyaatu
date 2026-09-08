const Redis = require('ioredis');

const redisHost = process.env.REDIS_HOST || '127.0.0.1';
const redisPort = Number(process.env.REDIS_PORT) || 6379;
const redisPassword = process.env.REDIS_PASSWORD || undefined;

const redisClient = new Redis({
  host: redisHost,
  port: redisPort,
  password: redisPassword,
  retryStrategy: () => null,
  lazyConnect: true,
  maxRetriesPerRequest: 1
});

redisClient.on('connect', () => {
  console.log('[Redis] Connected for Antigravity zero-lag query caching');
});

redisClient.on('error', (err) => {
  console.warn('[Redis Warning]:', err.message);
});

module.exports = redisClient;
