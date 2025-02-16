import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const polls = await prisma.poll.findMany({
      include: { options: true },
    });
    return NextResponse.json(polls);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch polls" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { question, options } = await request.json();

    if (!question || !Array.isArray(options) || options.length === 0) {
      return NextResponse.json({ error: "Invalid poll data" }, { status: 400 });
    }

    const newPoll = await prisma.poll.create({
      data: {
        question,
        options: { create: options.map((text) => ({ text, votes: 0 })) },
      },
      include: { options: true },
    });

    return NextResponse.json(newPoll, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create poll" }, { status: 500 });
  }
}
