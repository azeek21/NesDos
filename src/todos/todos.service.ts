import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateTodoDto } from "./dto/create-todo.dto";
import { UpdateTodoDto } from "./dto/update-todo.dto";
import { Prisma, Todo } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

interface IfindAllParams {
  skip?: number;
  take?: number;
  cursor?: Prisma.TodoWhereUniqueInput;
  where?: Prisma.TodoWhereInput;
  orderBy?: Prisma.TodoOrderByWithRelationInput;
}

@Injectable()
export class TodosService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.TodoUncheckedCreateInput) {
    try {
      return this.prisma.todo.create({
        data,
      });
    } catch {
      throw new NotFoundException("No such todo");
    }
  }

  async findAll(params?: IfindAllParams) {
    return this.prisma.todo.findMany({
      skip: params?.skip,
      take: params?.take,
      cursor: params?.cursor,
      where: params?.where,
      orderBy: params?.orderBy,
    });
  }

  async findOne(todoWhereUniqueInput: Prisma.TodoWhereUniqueInput) {
    try {
      return this.prisma.todo.findUnique({
        where: todoWhereUniqueInput,
      });
    } catch {
      throw new NotFoundException("No such todo");
    }
  }

  async update(params: {
    where: Prisma.TodoWhereUniqueInput;
    data: Prisma.TodoUpdateInput;
  }) {
    const { data, where } = params;
    try {
      return this.prisma.todo.update({
        where,
        data,
      });
    } catch {
      throw new NotFoundException("No such todo");
    }
  }

  async delete(where: Prisma.TodoWhereUniqueInput) {
    try {
      return this.prisma.todo.deleteMany({
        where,
      });
    } catch {
      throw new NotFoundException("No such todo");
    }
  }
}
