import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  UnauthorizedException,
  NotFoundException,
} from "@nestjs/common";
import { TodosService } from "./todos.service";
import { CreateTodoDto } from "./dto/create-todo.dto";
import { UpdateTodoDto } from "./dto/update-todo.dto";
import { AuthGuard } from "src/auth/auth.guard";
import { AuthedRequest } from "src/auth/types";
import { Todo } from "@prisma/client";

@Controller("todos")
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createTodoDto: CreateTodoDto, @Request() req: AuthedRequest) {
    const user = req.user;
    if (!user) {
      throw new UnauthorizedException();
    }

    // inject ownerId from user.id
    createTodoDto.ownerId = user.id;

    return this.todosService.create(createTodoDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll(@Request() req: AuthedRequest) {
    return this.todosService.findAll({
      where: {
        ownerId: req.user.id,
      },
    });
  }

  @UseGuards(AuthGuard)
  @Get(":id")
  async findOne(@Param("id") id: string, @Request() req: AuthedRequest) {
    const todo = await this.todosService.findOne({
      id: Number(id),
      ownerId: req.user.id,
    });

    if (!todo) {
      throw new NotFoundException("No such todo");
    }

    return todo;
  }

  @UseGuards(AuthGuard)
  @Patch(":id")
  async update(
    @Param("id") id: string,
    @Body() updateTodoDto: UpdateTodoDto,
    @Request() req: AuthedRequest,
  ) {
    try {
      return this.todosService.update({
        where: { id: Number(id), ownerId: req.user.id },
        data: updateTodoDto,
      });
    } catch {
      throw new NotFoundException();
    }
  }

  @Delete(":id")
  delete(@Param("id") id: string) {
    try {
      return this.todosService.delete({ id: Number(id) });
    } catch {
      throw new NotFoundException("No such todo");
    }
  }
}
