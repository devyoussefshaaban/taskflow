import { ConflictException, Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { Priority, Prisma, Status } from '../../generated/prisma/client';
import { CreateTaskDto } from './dto/create-task-dto';
import { UpdateTaskDto } from './dto/update-task-dto';

@Injectable()
export class TasksService {
  constructor(private readonly dbService: DatabaseService) {}

  async findAll(
    projectId: number,
    userId: number,
    status?: Status,
    priority?: Priority,
    search?: string,
  ) {
    const project = await this.dbService.project.findUnique({
      where: {
        id: projectId,
      },
    });

    if (!project) throw new ConflictException('Project not found.');

    return await this.dbService.task.findMany({
      where: {
        projectId,
        userId,
        ...(status && { status }),
        ...(priority && { priority }),
        ...(search && {
          OR: [
            {
              title: {
                contains: search,
                mode: 'insensitive',
              },
            },
            {
              description: {
                contains: search,
                mode: 'insensitive',
              },
            },
          ],
        }),
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(projectId: number, id: number, userId: number) {
    try {
      const task = await this.dbService.task.findUnique({
        where: {
          projectId,
          id,
          userId,
        },
      });
      if (!task) throw new ConflictException('Task not found');
      return this.dbService.task.findUnique({
        where: {
          id,
          userId,
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2001') {
          throw new ConflictException('A task with this title already exists.');
        }
      }
      throw error;
    }
  }

  async createTask(
    createTaskDto: CreateTaskDto,
    userId: number,
    projectId: number,
  ) {
    try {
      const isExists = await this.dbService.task.findFirst({
        where: {
          projectId,
          title: createTaskDto.title,
        },
      });

      if (isExists)
        throw new ConflictException('Task already exists in the project.');

      return await this.dbService.task.create({
        data: { ...createTaskDto, userId, projectId },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException(
            'A task with the same info already created.',
          );
        }
      }
      throw error;
    }
  }

  async updateTask(
    projectId: number,
    id: number,
    updateTaskDto: UpdateTaskDto,
    userId: number,
  ) {
    try {
      const project = await this.dbService.project.findUnique({
        where: {
          id: projectId,
        },
      });

      if (!project) throw new ConflictException('Project not found.');
      const task = await this.dbService.task.findUnique({
        where: {
          projectId,
          id,
          userId,
        },
      });
      if (!task) throw new ConflictException('Task not found');
      return this.dbService.task.update({
        where: {
          projectId,
          id,
          userId,
        },
        data: updateTaskDto,
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2001') {
          throw new ConflictException('A task with this title already exists.');
        }
      }
      throw error;
    }
  }

  async deleteTask(projectId: number, id: number, userId: number) {
    try {
      const project = await this.dbService.project.findUnique({
        where: {
          id: projectId,
        },
      });

      if (!project) throw new ConflictException('Project not found.');

      const task = await this.dbService.task.findUnique({
        where: {
          projectId,
          id,
          userId,
        },
      });

      if (!task) throw new ConflictException('Task not found.');
      return this.dbService.task.delete({
        where: {
          projectId,
          id,
          userId,
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException('A task with this title already exists.');
        }
      }
      throw error;
    }
  }
}
