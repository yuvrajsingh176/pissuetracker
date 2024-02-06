import { issuesschema } from "@/app/Validschema";
import prisma from "@/prisma/client";

import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  const valid = issuesschema.safeParse(body);
  if (!valid.success) {
    return NextResponse.json(valid.error.errors, { status: 400 });
  }
  console.log('success')
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue) {
    return NextResponse.json({ error: "inavlid issue" }, { status: 404 });
  }

  console.log('issue present')

  const upissue = await prisma.issue.update({
    where: { id: issue.id },
    data: {
      title: body.title,
      description: body.description,
    },
  });
  console.log(upissue);
  return NextResponse.json(upissue);
}
