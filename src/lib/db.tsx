import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
})

async function initializeRedis() {
  await redis.set('foo', 'bar');
  const data = await redis.get('foo');
  console.log(data);
}

initializeRedis();