import { Todo } from "@prisma/client";
export declare class TodoEntity implements Todo {
    id: number;
    title: string;
    content: string;
    done: boolean;
    ownerId: number;
}
export declare class TodoDeletedEntity {
    deleted: true;
}
