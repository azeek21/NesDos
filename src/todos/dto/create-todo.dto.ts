import { IsOptional, MaxLength, IsDefined, IsBoolean } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
export class CreateTodoDto {
  @MaxLength(255, {
    message: "Todo title can't be longer than 255 chars",
  })
  @ApiProperty({ description: "Title of the todo, max 255 chars" })
  title: string;

  @IsDefined()
  @ApiProperty({ description: "Content of the todo." })
  content: string;

  @IsDefined()
  @IsBoolean()
  @ApiProperty({ description: "Todo is done or not" })
  done: boolean;

  ownerId: number;
}
