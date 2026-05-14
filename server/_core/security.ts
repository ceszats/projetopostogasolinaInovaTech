import type { NextFunction, Request, Response } from "express";

type RateLimitOptions = {
  windowMs: number;
  max: number;
};

const buckets = new Map<string, { count: number; resetAt: number }>();

function clientKey(req: Request) {
  const forwardedFor = req.headers["x-forwarded-for"];
  const ip = Array.isArray(forwardedFor) ? forwardedFor[0] : forwardedFor?.split(",")[0];
  return `${ip?.trim() || req.ip || req.socket.remoteAddress || "unknown"}:${req.path}`;
}

export function rateLimit({ windowMs, max }: RateLimitOptions) {
  return (req: Request, res: Response, next: NextFunction) => {
    const now = Date.now();
    const key = clientKey(req);
    const current = buckets.get(key);

    if (!current || current.resetAt <= now) {
      buckets.set(key, { count: 1, resetAt: now + windowMs });
      next();
      return;
    }

    if (current.count >= max) {
      res.status(429).json({ error: "Too many requests" });
      return;
    }

    current.count += 1;
    next();
  };
}

export function securityHeaders(_req: Request, res: Response, next: NextFunction) {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("Permissions-Policy", "camera=(), microphone=(), geolocation=(self)");
  res.setHeader("Cross-Origin-Resource-Policy", "same-site");
  next();
}

export function getAllowedOrigins() {
  return (process.env.ALLOWED_ORIGINS || process.env.EXPO_WEB_PREVIEW_URL || "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);
}
