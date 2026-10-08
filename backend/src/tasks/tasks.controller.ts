import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task-dto';
import { UpdateTaskDto } from './dto/update-task-dto';
import { JwtAuthGuard } from 'src/auth/guards/auth.guard';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import type { AuthUser } from 'src/auth/types/auth-user.type';
import { Priority, Status } from 'generated/prisma/enums';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(
    @CurrentUser() user: AuthUser,
    @Query('status') status?: Status,
    @Query('priority') priority?: Priority,
    @Query('search') search?: string,
  ) {
    return this.tasksService.findAll(user.userId, status, priority, search);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: AuthUser,
  ) {
    return this.tasksService.findOne(id, user.userId);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  createTask(
    @Body() createTaskDto: CreateTaskDto,
    @CurrentUser() user: AuthUser,
    @Param('projectId', ParseIntPipe) projectId: number,
  ) {
    return this.tasksService.createTask(createTaskDto, user.userId, projectId);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  updateTask(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: AuthUser,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return this.tasksService.updateTask(id, updateTaskDto, user.userId);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  deleteTask(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: AuthUser,
  ) {
    return this.tasksService.deleteTask(id, user.userId);
  }
}
