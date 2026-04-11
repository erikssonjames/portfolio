import { featuredProject, projects } from "@/components/home/projects"
import { NextResponse } from "next/server"

export const runtime = "nodejs"

function isValidHttpUrl(value: string) {
  try {
    const url = new URL(value)
    return url.protocol === "http:" || url.protocol === "https:"
  } catch {
    return false
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const target = searchParams.get("url")

  if (!target || !isValidHttpUrl(target)) {
    return NextResponse.json(
      { ok: false, error: "Invalid or missing ?url=" },
      { status: 400 }
    )
  }

  const projectUrls = [featuredProject.healthCheckUrl, ...projects.map((project) => project.healthCheckUrl)].filter(
    Boolean
  ) as string[]

  const allowedHosts = new Set(
    projectUrls
      .map((url) => {
        try {
          return new URL(url).host
        } catch {
          return null
        }
      })
      .filter(Boolean) as string[]
  )

  const host = new URL(target).host

  if (!allowedHosts.has(host)) {
    return NextResponse.json(
      { ok: false, error: "Host not allowed" },
      { status: 403 }
    )
  }

  try {
    let res = await fetch(target, {
      method: "HEAD",
      redirect: "follow",
      cache: "no-store",
    })

    if (res.status === 405 || res.status === 501) {
      res = await fetch(target, {
        method: "GET",
        redirect: "follow",
        cache: "no-store",
      })
    }

    return NextResponse.json(
      {
        ok: res.ok,
        status: res.status,
        finalUrl: res.url,
      },
      { status: 200 }
    )
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error)

    return NextResponse.json(
      { ok: false, error: message },
      { status: 502 }
    )
  }
}
