import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { createIssuesschema } from "../../Validschema";
export async function POST(request: NextRequest) {
  const body = await request.json();
  const valid = createIssuesschema.safeParse(body);
  if (!valid.success) {
    return NextResponse.json(valid.error.errors, { status: 400 });
  }
  const newIssue = await prisma.issue.create({
    data: {
      title: body.title,
      description: body.description,
    },
  });
  return NextResponse.json(newIssue, { status: 201 });
}
