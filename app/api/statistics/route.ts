import { prismaClient } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server"

export async function GET() {
  const statistics = await prismaClient.gameOfLifeStats.findFirst({
    where: { id: 1 },
  })

  if (!statistics) {
    return NextResponse.json({ "error": "DB is not initialized" }, { status: 500 })
  }

  return NextResponse.json(statistics);
}

export async function PUT(request: NextRequest) {
  const body = await request.json();

  const deaths: number = body.deaths;
  const rebirths: number = body.rebirths;

  if (deaths === undefined || rebirths === undefined) {
    return NextResponse.json({ "error": "Invalid request body" }, { status: 400 })
  }

  const data = await prismaClient.$transaction(async tx => {
    const current = await tx.gameOfLifeStats.findFirst({
      where: { id: 1 },
    });

    if (!current) {
      throw new Error("Something went wrong, DB error");
    }

    const newDeaths = deaths + current.deaths;
    const newRebirts = rebirths + current.rebirths;

    await tx.gameOfLifeStats.update({
      where: { id: 1 },
      data: { deaths: newDeaths, rebirths: newRebirts }
    })

    return { death: newDeaths, rebirths: newRebirts }
  })
  
  return NextResponse.json(data);
}