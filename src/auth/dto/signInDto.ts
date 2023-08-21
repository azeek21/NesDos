import { IsEmail, IsNotEmpty, IsStrongPassword } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export default class SignInDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ description: "Users's email address for logging in" })
  email: string;

  @IsNotEmpty()
  @ApiProperty({ description: "User's password for logging in" })
  password: string;
}
