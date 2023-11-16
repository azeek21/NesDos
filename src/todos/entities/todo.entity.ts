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

  @ApiProperty({ required: false, nullable: true })
  updatedAt: Date;

  @ApiProperty({ required: false, nullable: true })
  createdAt: Date;
}

export class TodoDeletedEntity {
  @ApiProperty()
  deleted: true;
}
