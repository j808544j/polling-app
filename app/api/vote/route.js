import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function POST(request) {
  try {
    const { optionId } = await request.json();

    if (!optionId) {
      return NextResponse.json({ error: "Option ID is required" }, { status: 400 });
    }

    const updatedOption = await prisma.option.update({
      where: { id: optionId },
      data: { votes: { increment: 1 } },
    });

    return NextResponse.json(updatedOption);
  } catch (error) {
    return NextResponse.json({ error: "Failed to cast vote" }, { status: 500 });
  }
}
