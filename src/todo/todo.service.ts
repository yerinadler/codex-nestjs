import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo, Status } from './entities/todo.entity';

@Injectable()
export class TodoService {
  private todos: Todo[] = [];

  create(createTodoDto: CreateTodoDto): Todo {
    const todo: Todo = {
      id: randomUUID(),
      title: createTodoDto.title,
      description: createTodoDto.description ?? '',
      status: Status.PENDING,
    };
    this.todos.push(todo);
    return todo;
  }

  findAll(): Todo[] {
    return this.todos;
  }

  findOne(id: string): Todo {
    const todo = this.todos.find((t) => t.id === id);
    if (!todo) {
      throw new NotFoundException(`Todo with id ${id} not found`);
    }
    return todo;
  }

  update(id: string, updateTodoDto: UpdateTodoDto): Todo {
    const todo = this.findOne(id);
    if (updateTodoDto.title !== undefined) todo.title = updateTodoDto.title;
    if (updateTodoDto.description !== undefined)
      todo.description = updateTodoDto.description;
    if (updateTodoDto.status !== undefined) todo.status = updateTodoDto.status;
    return todo;
  }

  remove(id: string): void {
    const index = this.todos.findIndex((t) => t.id === id);
    if (index === -1) {
      throw new NotFoundException(`Todo with id ${id} not found`);
    }
    this.todos.splice(index, 1);
  }
}
