import { createClient } from "redis"

const client = createClient({
  url: process.env.UPSTASH_REDIS_URL
});

client.on("error", function(err) {
  throw err;
});
await client.connect()
await client.set('foo','bar');

// Disconnect after usage
await client.disconnect();