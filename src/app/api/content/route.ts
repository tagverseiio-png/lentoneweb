import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth/next";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const page = searchParams.get("page");
    
    if (page) {
      const content = await prisma.pageContent.findMany({ where: { page } });
      return NextResponse.json(content);
    }
    
    const allContent = await prisma.pageContent.findMany();
    return NextResponse.json(allContent);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch content" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { page, section, content } = await req.json();

    const updated = await prisma.pageContent.upsert({
      where: {
        page_section: {
          page,
          section
        }
      },
      update: {
        content
      },
      create: {
        page,
        section,
        content
      }
    });

    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update content" }, { status: 500 });
  }
}
