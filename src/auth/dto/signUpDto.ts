import { Prisma } from "@prisma/client";
import { IsEmail, IsNotEmpty, IsStrongPassword } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
export class SignUpTdo implements Prisma.UserCreateInput {
  @IsNotEmpty()
  @ApiProperty({ description: "Name of the user to sign up" })
  name: string;

  @IsEmail()
  @ApiProperty({
    description: "Email of the user, it has to be unuque per user.",
  })
  email: string;

  @IsStrongPassword(
    {
      minLength: 8,
      minUppercase: 1,
      minLowercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    },
    {
      message:
        "Password should be minimum 8 characters long and shuld constist of at least 1 uppercase letter, 1 lower case letter, 1 number and 1 symbol",
    },
  )
  @ApiProperty({
    description:
      "Password should be minimum 8 characters long and shuld constist of at least 1 uppercase letter, 1 lower case letter, 1 number and 1 symbol",
  })
  password: string;
}
