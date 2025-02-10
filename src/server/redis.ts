"use server";

import Redis from "redis";

const redis = Redis.createClient({
  url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
  database: process.env.REDIS_DB as unknown as number,
});

// Connect to Redis when the module is imported
redis.connect().catch(console.error);

redis.on("error", (err) => {
  console.error(" Redis error", err);
});

redis.on("connect", () => {
  console.log(" Redis connected");
});

redis.on("reconnecting", () => {
  console.log(" Redis reconnecting");
});

// Wrap the Redis client in an async function that ensures connection
export async function getRedisClient() {
  if (!redis.isOpen) {
    await redis.connect();
  }
  return redis;
}
