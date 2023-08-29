"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodosController = void 0;
const common_1 = require("@nestjs/common");
const todos_service_1 = require("./todos.service");
const create_todo_dto_1 = require("./dto/create-todo.dto");
const update_todo_dto_1 = require("./dto/update-todo.dto");
const auth_guard_1 = require("../auth/auth.guard");
const swagger_1 = require("@nestjs/swagger");
const todo_entity_1 = require("./entities/todo.entity");
let TodosController = exports.TodosController = class TodosController {
    constructor(todosService) {
        this.todosService = todosService;
    }
    create(createTodoDto, req) {
        const user = req.user;
        createTodoDto.ownerId = user.id;
        return this.todosService.create(createTodoDto);
    }
    findAll(req) {
        return this.todosService.findAll({
            where: {
                ownerId: req.user.id,
            },
            orderBy: {
                id: "asc",
            },
        });
    }
    async findOne(id, req) {
        const todo = await this.todosService.findOne({
            id: Number(id),
            ownerId: req.user.id,
        });
        if (!todo) {
            throw new common_1.NotFoundException("No such todo");
        }
        return todo;
    }
    async update(id, updateTodoDto, req) {
        try {
            return await this.todosService.update({
                where: { id: Number(id), ownerId: req.user.id },
                data: updateTodoDto,
            });
        }
        catch {
            throw new common_1.NotFoundException();
        }
    }
    async delete(id, req) {
        const deleted = await this.todosService.delete({
            id: Number(id),
            ownerId: req.user.id,
        });
        if (deleted.count > 0) {
            return {
                deleted: true,
            };
        }
        throw new common_1.NotFoundException("No such todo");
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiCreatedResponse)({ type: todo_entity_1.TodoEntity }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_todo_dto_1.CreateTodoDto, Object]),
    __metadata("design:returntype", void 0)
], TodosController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOkResponse)({ type: todo_entity_1.TodoEntity, isArray: true }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TodosController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(":id"),
    (0, swagger_1.ApiOkResponse)({ type: todo_entity_1.TodoEntity }),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], TodosController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(":id"),
    (0, swagger_1.ApiOkResponse)({ type: todo_entity_1.TodoEntity }),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_todo_dto_1.UpdateTodoDto, Object]),
    __metadata("design:returntype", Promise)
], TodosController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(":id"),
    (0, swagger_1.ApiOkResponse)({ type: todo_entity_1.TodoDeletedEntity }),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], TodosController.prototype, "delete", null);
exports.TodosController = TodosController = __decorate([
    (0, swagger_1.ApiCookieAuth)("jwt"),
    (0, swagger_1.ApiTags)("todos"),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Controller)("todos"),
    __metadata("design:paramtypes", [todos_service_1.TodosService])
], TodosController);
//# sourceMappingURL=todos.controller.js.map