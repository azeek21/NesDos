import { Prisma } from "@prisma/client";

export class SignUpTdo implements Prisma.UserCreateInput {
  name?: string;
  email: string;
  password?: string;
}
