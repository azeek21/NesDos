import { Injectable, NotFoundException } from "@nestjs/common";
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
    return this.prisma.todo.create({
      data,
    });
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
    return this.prisma.todo.findUnique({
      where: todoWhereUniqueInput,
    });
  }

  async update(params: {
    where: Prisma.TodoWhereUniqueInput;
    data: Prisma.TodoUpdateInput;
  }) {
    const { data, where } = params;
    return this.prisma.todo.update({
      where,
      data,
    });
  }

  async delete(where: Prisma.TodoWhereUniqueInput) {
    return this.prisma.todo.deleteMany({
      where,
    });
  }
}
