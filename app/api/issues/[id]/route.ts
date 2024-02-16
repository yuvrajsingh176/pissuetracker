import { patchIssuesschema } from "@/app/Validschema";
import authOptions from "@/app/auth/authOptions";
import prisma from "@/prisma/client";
import delay from "delay";
import { getServerSession } from "next-auth";
import { getServerActionDispatcher } from "next/dist/client/components/app-router";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });
  const body = await request.json();
  const valid = patchIssuesschema.safeParse(body);
  if (!valid.success) {
    return NextResponse.json(valid.error.errors, { status: 400 });
  }

  const { assignedToUserId, title, description } = body;
  if (assignedToUserId) {
    const user = await prisma.user.findUnique({
      where: { id: assignedToUserId },
    });
    if (!user) {
      return NextResponse.json({ error: "Invalid user" }, { status: 400 });
    }
  }
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!issue) {
    return NextResponse.json({ error: "something error" }, { status: 400 });
  }
  const updatedIssue = await prisma.issue.update({
    where: { id: issue.id },
    data: {
      title,
      description,
      assignedToUserId,
    },
  });
  return NextResponse.json(updatedIssue);
}
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!issue) {
    return NextResponse.json({ error: "Issue not found" }, { status: 400 });
  }
  const deletedIssue = await prisma.issue.delete({
    where: { id: issue.id },
  });
  return NextResponse.json({ deletedIssue });
}
