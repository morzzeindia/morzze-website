import crypto from "crypto";

/** Signed session cookie for /admin. Set ADMIN_ACCESS_COOKIE_SECRET (16+ chars). */
const COOKIE_NAME = "admin_access" as const;

function getCookieSecret(): string | null {
  const s = process.env.ADMIN_ACCESS_COOKIE_SECRET;
  if (!s || s.length < 16) return null;
  return s;
}

export function getAdminAccessCookieName(): typeof COOKIE_NAME {
  return COOKIE_NAME;
}

export function signAdminSession(): string | null {
  const secret = getCookieSecret();
  if (!secret) return null;
  const payload = Buffer.from(
    JSON.stringify({
      v: 1 as const,
      exp: Date.now() + 7 * 24 * 60 * 60 * 1000,
    }),
    "utf8",
  ).toString("base64url");
  const sig = crypto.createHmac("sha256", secret).update(payload).digest("base64url");
  return `${payload}.${sig}`;
}

export function verifyAdminSession(token: string | undefined | null): boolean {
  if (!token || !token.includes(".")) return false;
  const secret = getCookieSecret();
  if (!secret) return false;
  const lastDot = token.lastIndexOf(".");
  const payload = token.slice(0, lastDot);
  const sig = token.slice(lastDot + 1);
  const expected = crypto.createHmac("sha256", secret).update(payload).digest("base64url");
  try {
    if (sig.length !== expected.length) return false;
    if (!crypto.timingSafeEqual(Buffer.from(sig, "utf8"), Buffer.from(expected, "utf8")))
      return false;
  } catch {
    return false;
  }
  try {
    const data = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as {
      exp?: number;
    };
    if (typeof data.exp !== "number" || data.exp < Date.now()) return false;
    return true;
  } catch {
    return false;
  }
}

/** Compare secrets without early exit on length mismatch (digest compare). */
export function adminSecretsEqual(a: string, b: string): boolean {
  if (!a || !b) return false;
  const da = crypto.createHash("sha256").update(a, "utf8").digest();
  const db = crypto.createHash("sha256").update(b, "utf8").digest();
  return crypto.timingSafeEqual(da, db);
}
