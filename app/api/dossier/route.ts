import { NextRequest } from "next/server";

export const runtime = "edge";

type RateEntry = {
  count: number;
  resetAt: number;
};

const windowMs = 60 * 60 * 1000;
const maxRequests = 5;
const buckets = new Map<string, RateEntry>();

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}

function getIp(req: NextRequest) {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown"
  );
}

function checkRateLimit(ip: string) {
  const now = Date.now();
  const entry = buckets.get(ip);

  if (!entry || entry.resetAt <= now) {
    buckets.set(ip, { count: 1, resetAt: now + windowMs });
    return true;
  }

  if (entry.count >= maxRequests) return false;

  entry.count += 1;
  buckets.set(ip, entry);
  return true;
}

export async function POST(req: NextRequest) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  const accessToken = process.env.DEMO_ACCESS_TOKEN;

  if (!apiKey || !accessToken) {
    return json({ error: "Demo server is missing required environment variables." }, 500);
  }

  if ((req.headers.get("x-demo-token") || "").trim() !== accessToken.trim()) {
    return json({ error: "Unauthorized demo request." }, 401);
  }

  const ip = getIp(req);
  if (!checkRateLimit(ip)) {
    return json({ error: "Demo limit reached. Try again in an hour." }, 429);
  }

  const body = await req.json().catch(() => null);
  const prompt = typeof body?.prompt === "string" ? body.prompt.slice(0, 12000) : "";

  if (!prompt.trim()) {
    return json({ error: "Missing prompt." }, 400);
  }

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-5-20250929",
      max_tokens: 1500,
      messages: [{ role: "user", content: prompt }],
    }),
  });

  const text = await response.text();

  return new Response(text, {
    status: response.status,
    headers: { "content-type": "application/json" },
  });
}
