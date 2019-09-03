import redis from 'redis';

// create and connect redis client to local instance.
const redisClient = redis.createClient(6379);

// echo redis errors to the console
redisClient.on('error', (err) => {
  console.log(`Error ${err}`);
});

export default redisClient;
