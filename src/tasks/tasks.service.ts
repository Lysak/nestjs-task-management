import { Injectable, HttpException, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import * as uuid from 'uuid/v1';
import { CreateTaskDto } from './dto/cretae-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTaskWithFilters(filterDto: GetTasksFilterDto):Task[] {
    const { status, search } = filterDto;
    let tasks = this.getAllTasks();

    if (status) {
      tasks = tasks.filter(task => task.status === status);
    }

    if (search) {
      tasks = tasks.filter(task =>
        task.title.includes(search) ||
        task.description.includes(search),
      );
    }

    return tasks;
  }

  getTaskById(id: string): Task {
    const found = this.tasks.find(task => task.id === id);

    if(!found) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }

    return found;
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;

    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);
    return task;
  }

  deleteTask(id: string): void {
    const found = this.getTaskById(id);
    // 2 for each (find, filter) fix in future
    this.tasks = this.tasks.filter(task => task.id !== found.id);
  }

  updateTaskStatus(id: string, status: TaskStatus): Task {
    // validation empty status
    const task = this.getTaskById(id);
    task.status = status;
    return task;
  }
}