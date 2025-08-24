import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req) {
  const { email, password, username } = await req.json();
  const exitsEmail = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (exitsEmail) {
    return NextResponse.json(
      { error: "Email already exists" },
      { status: 409 }
    );
  }
  const hashPass = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      email,
      password: hashPass,
      name: username,
    },
  });

  return NextResponse.json({ user });
}
