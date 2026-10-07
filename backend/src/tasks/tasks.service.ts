import { ConflictException, Injectable } from '@nestjs/common';
import { TaskCreateInput, TaskUpdateInput } from 'generated/prisma/models';
import { DatabaseService } from 'src/database/database.service';
import { Prisma } from '../../generated/prisma/client';
import { CreateTaskDto } from './dto/create-task-dto';

@Injectable()
export class TasksService {
  constructor(private readonly dbService: DatabaseService) {}

  findAll() {
    return this.dbService.task.findMany();
  }

  async createTask(taskCreateInput: CreateTaskDto) {
    try {
      return await this.dbService.task.create({
        data: taskCreateInput,
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException(
            'A task with the same info already created.',
          );
        }
      }
    }
  }

  updateTask(id: number, taskUpdateInpt: TaskUpdateInput) {
    return this.dbService.task.update({
      where: {
        id,
      },
      data: taskUpdateInpt,
    });
  }

  deleteTask(id: number) {
    return this.dbService.task.delete({
      where: {
        id,
      },
    });
  }
}
