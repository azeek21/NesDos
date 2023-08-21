import { Todo } from "@prisma/client";
import { ApiProperty } from "@nestjs/swagger";
export class TodoEntity implements Todo {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  content: string;

  @ApiProperty()
  done: boolean;

  @ApiProperty({ required: false, nullable: true })
  ownerId: number;
}

export class TodoDeletedEntity {
  @ApiProperty()
  deleted: true;
}
