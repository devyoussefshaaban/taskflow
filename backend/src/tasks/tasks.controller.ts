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
import { JwtAuthGuard } from '../auth/guards/auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import type { AuthUser } from '../auth/types/auth-user.type';
import { Priority, Status } from '../../generated/prisma/enums';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('projects')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get(':projectId/tasks')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  findAll(
    @Param('projectId', ParseIntPipe) projectId: number,
    @CurrentUser() user: AuthUser,
    @Query('status') status?: Status,
    @Query('priority') priority?: Priority,
    @Query('search') search?: string,
  ) {
    return this.tasksService.findAll(
      projectId,
      user.userId,
      status,
      priority,
      search,
    );
  }

  @Get(':projectId/tasks/:id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  findOne(
    @Param('projectId', ParseIntPipe) projectId: number,
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: AuthUser,
  ) {
    return this.tasksService.findOne(projectId, id, user.userId);
  }

  @Post(':projectId/tasks')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  createTask(
    @Body() createTaskDto: CreateTaskDto,
    @CurrentUser() user: AuthUser,
    @Param('projectId', ParseIntPipe) projectId: number,
  ) {
    return this.tasksService.createTask(createTaskDto, user.userId, projectId);
  }

  @Patch(':projectId/tasks/:id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  updateTask(
    @Param('projectId', ParseIntPipe) projectId: number,
    @Param('projectId', ParseIntPipe) id: number,
    @CurrentUser() user: AuthUser,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return this.tasksService.updateTask(
      projectId,
      id,
      updateTaskDto,
      user.userId,
    );
  }

  @Delete(':projectId/tasks/:id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  deleteTask(
    @Param('projectId', ParseIntPipe) projectId: number,
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: AuthUser,
  ) {
    return this.tasksService.deleteTask(projectId, id, user.userId);
  }
}
