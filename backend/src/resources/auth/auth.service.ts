import bcrypt from "bcryptjs";
import { prisma } from "../../lib/prisma";
import type { SignupBody, LoginBody } from "./auth.types";

const DUMMY_HASH = bcrypt.hashSync("dummy_timing_guard", 10);

export async function signup(data: SignupBody) {
  try {
    const hash = await bcrypt.hash(data.password, 10);
    return await prisma.user.create({
      data: { email: data.email, fullname: data.fullname, password: hash },
      select: { id: true, email: true, fullname: true, createdAt: true, updatedAt: true },
    });
  } catch (e) {
    if ((e as { code?: string }).code === "P2002") return null;
    throw e;
  }
}

export async function login(data: LoginBody) {
  const user = await prisma.user.findUnique({ where: { email: data.email } });
  const hash = user?.password ?? DUMMY_HASH;
  const valid = await bcrypt.compare(data.password, hash);
  if (!user || !valid) return null;
  return user;
}
