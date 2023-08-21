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
import {
  ApiCookieAuth,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiTags,
} from "@nestjs/swagger";
import { TodoDeletedEntity, TodoEntity } from "./entities/todo.entity";

@Controller("todos")
@ApiCookieAuth("jwt")
@ApiTags("todos")
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @UseGuards(AuthGuard)
  @Post()
  @ApiCreatedResponse({ type: TodoEntity })
  create(@Body() createTodoDto: CreateTodoDto, @Request() req: AuthedRequest) {
    const user = req.user;

    // inject ownerId from user.id
    createTodoDto.ownerId = user.id;

    return this.todosService.create(createTodoDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  @ApiOkResponse({ type: TodoEntity })
  findAll(@Request() req: AuthedRequest) {
    return this.todosService.findAll({
      where: {
        ownerId: req.user.id,
      },
      orderBy: {
        id: "asc",
      },
    });
  }

  @UseGuards(AuthGuard)
  @Get(":id")
  @ApiOkResponse({ type: TodoEntity })
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
  @ApiOkResponse({ type: TodoEntity })
  async update(
    @Param("id") id: string,
    @Body() updateTodoDto: UpdateTodoDto,
    @Request() req: AuthedRequest,
  ) {
    try {
      return await this.todosService.update({
        where: { id: Number(id), ownerId: req.user.id },
        data: updateTodoDto,
      });
    } catch {
      throw new NotFoundException();
    }
  }

  @UseGuards(AuthGuard)
  @Delete(":id")
  @ApiOkResponse({ type: TodoDeletedEntity })
  async delete(@Param("id") id: string, @Request() req: AuthedRequest) {
    const deleted = await this.todosService.delete({
      id: Number(id),
      ownerId: req.user.id,
    });
    if (deleted.count > 0) {
      return {
        deleted: true,
      };
    }
    throw new NotFoundException("No such todo");
  }
}
