import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
   private tasks = [] as any[];
    private idCounter = 1;
  create(createTaskDto: CreateTaskDto) {
    const task = {
      id: this.idCounter++, ...createTaskDto
    };
    this.tasks.push(task);
    return task;
  }

  findAll() {
    return this.tasks;
  }

  findOne(id: number) {
    return this.tasks.find(task => task.id === id);
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    const taskIndex = this.tasks.findIndex(task => task.id === id);
    if (taskIndex === -1) {
      return `task with id ${id} not found`;
    }
    this.tasks[taskIndex] = { ...this.tasks[taskIndex], ...updateTaskDto };
    return this.tasks[taskIndex];
  }

  remove(id: number) {
    const taskIndex = this.tasks.findIndex(task => task.id === id);
    if (taskIndex === -1) {
      return `task with id ${id} not found`;
    }
    this.tasks.splice(taskIndex, 1);
    return `this action removes a #${id} task`;
  }
}
