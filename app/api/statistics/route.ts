import { prismaClient } from "@/lib/prisma";
import { tryParseStatisticValue } from "@/lib/large-number";
import { NextRequest, NextResponse } from "next/server"

export async function GET() {
  const statistics = await prismaClient.gameOfLifeStats.findFirst({
    where: { id: 1 },
  })

  if (!statistics) {
    return NextResponse.json({ "error": "DB is not initialized" }, { status: 500 })
  }

  return NextResponse.json({
    id: statistics.id,
    deaths: statistics.deaths.toString(),
    rebirths: statistics.rebirths.toString(),
  });
}

export async function PUT(request: NextRequest) {
  const body = await request.json();

  const deaths = tryParseStatisticValue(body.deaths);
  const rebirths = tryParseStatisticValue(body.rebirths);

  if (deaths === null || rebirths === null || deaths < BigInt(0) || rebirths < BigInt(0)) {
    return NextResponse.json({ "error": "Invalid request body" }, { status: 400 })
  }

  const data = await prismaClient.$transaction(async tx => {
    const updated = await tx.gameOfLifeStats.update({
      where: { id: 1 },
      data: {
        deaths: { increment: deaths },
        rebirths: { increment: rebirths },
      }
    })

    return {
      deaths: updated.deaths.toString(),
      rebirths: updated.rebirths.toString(),
    }
  })
  
  return NextResponse.json(data);
}
