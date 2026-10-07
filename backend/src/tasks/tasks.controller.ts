import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import type { TaskCreateInput, TaskUpdateInput } from 'generated/prisma/models';
import { log } from 'console';
import { CreateTaskDto } from './dto/create-task-dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  findAll() {
    return this.tasksService.findAll();
  }

  @Post()
  createTask(@Body() taskCreateInput: CreateTaskDto) {
    return this.tasksService.createTask(taskCreateInput);
  }

  @Patch(':id')
  updateTask(
    @Param('id', ParseIntPipe) id: number,
    taskUpdateInput: TaskUpdateInput,
  ) {
    return this.tasksService.updateTask(id, taskUpdateInput);
  }

  @Delete(':id')
  deleteTask(@Param('id', ParseIntPipe) id: number) {
    return this.tasksService.deleteTask(id);
  }
}
