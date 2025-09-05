import { createClient } from "redis"
import dotenv from 'dotenv'

dotenv.config();

export const redis = createClient({
  url: process.env.UPSTASH_REDIS_URL
});

async function connectRedis() {
  await redis.connect();
}

connectRedis();

if(!connectRedis){
  console.log("Redis Not Connected");
}
