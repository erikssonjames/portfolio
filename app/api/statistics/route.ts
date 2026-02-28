import { prismaClient } from "@/lib/prisma";
import { NextResponse } from "next/server"

export async function GET() {
  const statistics = await prismaClient.gameOfLifeStats.findFirst({
    where: { id: 1 },
  })

  if (!statistics) {
    return NextResponse.json({ "error": "DB is not initialized" }, { status: 500 })
  }

  return NextResponse.json(statistics);
}