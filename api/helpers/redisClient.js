import redis from 'redis';

// create and connect redis client to local instance.
const redisClient = redis.createClient(process.env.REDIS_URL);

// echo redis errors to the console
redisClient.on('error', (err) => {
  // eslint-disable-next-line no-console
  console.log(`Error ${err}`);
});

export default redisClient;
