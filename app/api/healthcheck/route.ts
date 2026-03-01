import { featuredProject, projects } from "@/components/home/projects";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

function isValidHttpUrl(value: string) {
  try {
    const u = new URL(value);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const target = searchParams.get("url");

  if (!target || !isValidHttpUrl(target)) {
    return NextResponse.json(
      { ok: false, error: "Invalid or missing ?url=" },
      { status: 400 }
    );
  }

const projectUrls = [
  featuredProject.healthCheckUrl,
  ...projects.map((p) => p.healthCheckUrl),
].filter(Boolean) as string[];

// Build allowlist as HOSTS
const allowedHosts = new Set(
  projectUrls.map((u) => {
    try {
      return new URL(u).host; // e.g. "jameseriksson.com"
    } catch {
      return null;
    }
  }).filter(Boolean) as string[]
);

const host = new URL(target).host;
  if (!allowedHosts.has(host)) {
    return NextResponse.json(
      { ok: false, error: "Host not allowed" },
      { status: 403 }
    );
  }

  try {
    let res = await fetch(target, {
      method: "HEAD",
      redirect: "follow",
      cache: "no-store",
    });

    if (res.status === 405 || res.status === 501) {
      res = await fetch(target, {
        method: "GET",
        redirect: "follow",
        cache: "no-store",
      });
    }

    return NextResponse.json(
      {
        ok: res.ok,
        status: res.status,
        finalUrl: res.url,
      },
      { status: 200 }
    );
  } catch (e: any) {
    return NextResponse.json(
      { ok: false, error: e?.message ?? String(e) },
      { status: 502 }
    );
  }
}