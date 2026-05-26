import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  const restaurant = await prisma.restaurant.findUnique({ where: { id } });
  if (!restaurant) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  if (restaurant.userId !== session.user.id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  await prisma.restaurant.delete({ where: { id } });
  return new NextResponse(null, { status: 204 });
}
