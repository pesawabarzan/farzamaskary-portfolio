// lib/redis.ts
import type { Redis as UpstashRedis } from "@upstash/redis";
import { Redis as Upstash } from "@upstash/redis";

// یک اینترفیس کوچک تا چه ریدیسی واقعی باشد چه فول‌بک، امضا یکی باشد
export interface IRedis {
  lpush: (key: string, value: any) => Promise<number>;
  ltrim: (key: string, start: number, stop: number) => Promise<"OK" | void>;
  lrange: <T = any>(key: string, start: number, stop: number) => Promise<T[]>;
}

// اگر ENV ها نباشند، فول‌بک حافظه‌ای
function createMemoryRedis(): IRedis {
  const store = new Map<string, any[]>();
  return {
    async lpush(key, value) {
      const arr = store.get(key) ?? [];
      arr.unshift(value);
      store.set(key, arr);
      return arr.length;
    },
    async ltrim(key, start, stop) {
      const arr = store.get(key) ?? [];
      const trimmed = arr.slice(start, stop + 1);
      store.set(key, trimmed);
      return "OK";
    },
    async lrange<T = any>(key, start, stop) {
      const arr = (store.get(key) ?? []) as T[];
      return arr.slice(start, stop + 1);
    },
  };
}

function createUpstashRedis(): IRedis {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    // برگرد به فول‌بک اگر ENV ناقص بود
    return createMemoryRedis();
  }

  const client: UpstashRedis = new Upstash({ url, token });
  return {
    lpush: (key, value) => client.lpush(key, value),
    ltrim: (key, start, stop) => client.ltrim(key, start, stop),
    // تایپینگ Upstash T را برنمی‌گرداند، اما خروجی JSON-safe است
    lrange: async <T = any>(key: string, start: number, stop: number) => {
      const res = await client.lrange(key, start, stop);
      return res as T[];
    },
  };
}

export const redis: IRedis = createUpstashRedis();
