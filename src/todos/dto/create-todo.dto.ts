import { IsOptional, MaxLength, IsDefined, IsBoolean } from "class-validator";

export class CreateTodoDto {
  @MaxLength(255, {
    message: "Todo title can't be longer than 255 chars",
  })
  title: string;

  @IsDefined()
  content: string;

  @IsDefined()
  @IsBoolean()
  done: boolean;

  @IsOptional()
  ownerId: number;
}
