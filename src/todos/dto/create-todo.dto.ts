import { Prisma } from "@prisma/client";

export class CreateTodoDto implements Prisma.TodoCreateInput {
  title: string;
  ownerId: number;
  content: string;
  done: boolean;
  owner: Prisma.UserCreateNestedOneWithoutTodosInput;
}
