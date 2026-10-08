import { ConflictException, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Priority, Prisma, Status } from '../../generated/prisma/client';
import { CreateTaskDto } from './dto/create-task-dto';
import { UpdateTaskDto } from './dto/update-task-dto';

@Injectable()
export class TasksService {
  constructor(private readonly dbService: DatabaseService) {}

  async findAll(
    userId: number,
    status?: Status,
    priority?: Priority,
    search?: string,
  ) {
    console.log({ status, priority, search });
    return await this.dbService.task.findMany({
      where: {
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

  async findOne(id: number, userId: number) {
    try {
      const task = await this.dbService.task.findUnique({
        where: {
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

  async updateTask(id: number, updateTaskDto: UpdateTaskDto, userId: number) {
    try {
      const task = await this.dbService.task.findUnique({
        where: {
          id,
          userId,
        },
      });
      if (!task) throw new ConflictException('Task not found');
      return this.dbService.task.update({
        where: {
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

  async deleteTask(id: number, userId: number) {
    try {
      const task = await this.dbService.task.findUnique({
        where: {
          id,
          userId,
        },
      });
      if (!task) throw new ConflictException('Task not found.');
      return this.dbService.task.delete({
        where: {
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
