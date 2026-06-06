const keys = require('./keys');
const redis = require('redis');

const redisClient = redis.createClient({
  socket: {
    host: keys.redisHost,
    port: keys.redisPort
  },
  retry_strategy: () => 1000
});

const sub = redisClient.duplicate();

function fib(index) {
  if (index === 0) return 0;
  if (index < 2) return 1;
  let a = 1, b = 1;
  for (let i = 2; i <= index; i++) {
    [a, b] = [b, a + b];
  }
  return b;
}

async function connectRedis() {
  await redisClient.connect();
  await sub.connect();

  await sub.subscribe('insert', async (message) => {
    const index = parseInt(message);
    if (isNaN(index) || index < 0 || index > 10000) {
      console.warn(`Worker: mensagem inválida descartada: "${message}"`);
      return;
    }
    await redisClient.hSet('values', message, fib(index).toString());
  });
}

connectRedis().catch(console.error);
