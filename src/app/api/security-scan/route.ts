import { NextResponse } from "next/server";
import dns from "node:dns/promises";
import net from "node:net";
import { rateLimit, getClientKey } from "@/lib/rateLimit";

// Outil passif uniquement : on lit les headers de la réponse HTTP publique.
// Aucune tentative d'exploitation, de scan de ports ou d'intrusion.

const SECURITY_HEADERS = [
  { key: "content-security-policy", label: "Content-Security-Policy", weight: 20 },
  { key: "strict-transport-security", label: "Strict-Transport-Security", weight: 20 },
  { key: "x-frame-options", label: "X-Frame-Options", weight: 15 },
  { key: "x-content-type-options", label: "X-Content-Type-Options", weight: 15 },
  { key: "referrer-policy", label: "Referrer-Policy", weight: 10 },
  { key: "permissions-policy", label: "Permissions-Policy", weight: 10 },
  { key: "cross-origin-opener-policy", label: "Cross-Origin-Opener-Policy", weight: 10 },
] as const;

function isPrivateIp(ip: string): boolean {
  if (net.isIPv4(ip)) {
    const parts = ip.split(".").map(Number);
    if (parts[0] === 10) return true;
    if (parts[0] === 127) return true;
    if (parts[0] === 0) return true;
    if (parts[0] === 169 && parts[1] === 254) return true;
    if (parts[0] === 172 && parts[1] >= 16 && parts[1] <= 31) return true;
    if (parts[0] === 192 && parts[1] === 168) return true;
    return false;
  }
  if (net.isIPv6(ip)) {
    const lower = ip.toLowerCase();
    if (lower === "::1") return true;
    if (lower.startsWith("fc") || lower.startsWith("fd")) return true;
    if (lower.startsWith("fe80")) return true;
    return false;
  }
  return true;
}

async function assertPublicHost(hostname: string) {
  if (hostname === "localhost") {
    throw new Error("Hôte non autorisé.");
  }
  const addresses = await dns.lookup(hostname, { all: true });
  for (const { address } of addresses) {
    if (isPrivateIp(address)) {
      throw new Error(
        "Cette URL pointe vers une ressource réseau privée : non autorisé."
      );
    }
  }
}

export async function POST(request: Request) {
  const clientKey = getClientKey(request);
  if (!rateLimit(`scan:${clientKey}`, 10, 60_000).allowed) {
    return NextResponse.json(
      { error: "Trop de requêtes, réessaie dans une minute." },
      { status: 429 }
    );
  }

  let targetUrl: URL;
  try {
    const body = await request.json();
    targetUrl = new URL(String(body.url));
  } catch {
    return NextResponse.json({ error: "URL invalide." }, { status: 400 });
  }

  if (!["http:", "https:"].includes(targetUrl.protocol)) {
    return NextResponse.json(
      { error: "Seuls http et https sont acceptés." },
      { status: 400 }
    );
  }

  try {
    await assertPublicHost(targetUrl.hostname);
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 400 });
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 6000);

  try {
    const res = await fetch(targetUrl.toString(), {
      method: "GET",
      redirect: "manual",
      signal: controller.signal,
      headers: { "User-Agent": "DevSecOps-AI-Scanner/1.0 (passive header check)" },
    });
    clearTimeout(timeout);

    if (res.status >= 300 && res.status < 400) {
      return NextResponse.json(
        {
          error: `Cette URL redirige (HTTP ${res.status}). Relance le scan avec l'URL de destination finale.`,
        },
        { status: 400 }
      );
    }

    const results = SECURITY_HEADERS.map((h) => ({
      label: h.label,
      present: res.headers.has(h.key),
      value: res.headers.get(h.key),
      weight: h.weight,
    }));

    const score = results.reduce((acc, r) => acc + (r.present ? r.weight : 0), 0);

    return NextResponse.json({
      url: targetUrl.toString(),
      status: res.status,
      score,
      results,
    });
  } catch {
    clearTimeout(timeout);
    return NextResponse.json(
      { error: "Impossible de contacter cette URL (timeout ou hôte injoignable)." },
      { status: 400 }
    );
  }
}
