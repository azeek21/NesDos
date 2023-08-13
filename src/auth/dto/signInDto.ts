import { IsEmail, IsNotEmpty, IsStrongPassword } from "class-validator";

export default class SignInDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}
