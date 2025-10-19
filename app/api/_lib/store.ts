// app/api/_lib/store.ts
type Kind = "order" | "contact";

const hasUpstash = !!process.env.UPSTASH_REDIS_REST_URL && !!process.env.UPSTASH_REDIS_REST_TOKEN;

// in-memory fallback (dev only)
const mem: Record<Kind, any[]> = { order: [], contact: [] };

async function upstashFetch(path: string, init?: RequestInit) {
  const url = `${process.env.UPSTASH_REDIS_REST_URL}${path}`;
  return fetch(url, {
    ...init,
    headers: {
      Authorization: `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}`,
      "Content-Type": "application/json",
      ...(init?.headers || {}),
    },
    cache: "no-store",
  });
}

export async function save(kind: Kind, value: any) {
  const item = { id: crypto.randomUUID(), kind, createdAt: Date.now(), ...value };
  if (hasUpstash) {
    // LPUSH submissions:<kind> <json>
    await upstashFetch(`/lpush/submissions:${kind}`, {
      method: "POST",
      body: JSON.stringify({ value: JSON.stringify(item) }),
    });
  } else {
    mem[kind].unshift(item);
  }
  return item;
}

export async function list(kind: Kind, limit = 50) {
  if (hasUpstash) {
    // LRANGE submissions:<kind> 0 limit-1
    const res = await upstashFetch(`/lrange/submissions:${kind}/0/${Math.max(0, limit - 1)}`);
    const data = await res.json();
    const arr = Array.isArray(data.result) ? data.result : [];
    return arr.map((x: string) => JSON.parse(x));
  }
  return mem[kind].slice(0, limit);
}
