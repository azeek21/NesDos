import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { TodosService } from "./todos.service";
import { CreateTodoDto } from "./dto/create-todo.dto";
import { UpdateTodoDto } from "./dto/update-todo.dto";

@Controller("todos")
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  create(@Body() createTodoDto: CreateTodoDto) {
    return this.todosService.create(createTodoDto);
  }

  @Get()
  findAll() {
    return this.todosService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.todosService.findOne({ id: Number(id) });
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todosService.update({
      where: { id: Number(id) },
      data: updateTodoDto,
    });
  }

  @Delete(":id")
  delete(@Param("id") id: string) {
    return this.todosService.delete({ id: Number(id) });
  }
}
