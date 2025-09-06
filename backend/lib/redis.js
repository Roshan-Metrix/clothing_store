import { createClient } from "redis"
import dotenv from 'dotenv'

dotenv.config({quiet: true});

export const redis = createClient({
  url: process.env.UPSTASH_REDIS_URL
});

async function connectRedis() {
  try {
    await redis.connect();
    console.log("Redis Connected");
    return true;
  } catch (error) {
    console.error("Redis Connection Error:", error);
    return false;
  }
}

const isConnected = await connectRedis();

if (!isConnected) {
  console.log("Redis Not Connected");
}

