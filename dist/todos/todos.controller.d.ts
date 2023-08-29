import { TodosService } from "./todos.service";
import { CreateTodoDto } from "./dto/create-todo.dto";
import { UpdateTodoDto } from "./dto/update-todo.dto";
import { AuthedRequest } from "src/auth/types";
export declare class TodosController {
    private readonly todosService;
    constructor(todosService: TodosService);
    create(createTodoDto: CreateTodoDto, req: AuthedRequest): Promise<{
        id: number;
        title: string;
        content: string;
        done: boolean;
        ownerId: number;
    }>;
    findAll(req: AuthedRequest): Promise<{
        id: number;
        title: string;
        content: string;
        done: boolean;
        ownerId: number;
    }[]>;
    findOne(id: string, req: AuthedRequest): Promise<{
        id: number;
        title: string;
        content: string;
        done: boolean;
        ownerId: number;
    }>;
    update(id: string, updateTodoDto: UpdateTodoDto, req: AuthedRequest): Promise<{
        id: number;
        title: string;
        content: string;
        done: boolean;
        ownerId: number;
    }>;
    delete(id: string, req: AuthedRequest): Promise<{
        deleted: boolean;
    }>;
}
