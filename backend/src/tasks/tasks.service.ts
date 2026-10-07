import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Prisma } from '../../generated/prisma/client';
import { CreateTaskDto } from './dto/create-task-dto';
import { UpdateTaskDto } from './dto/update-task-dto';

@Injectable()
export class TasksService {
  constructor(private readonly dbService: DatabaseService) {}

  findAll() {
    return this.dbService.task.findMany();
  }

  async createTask(createTaskDto: CreateTaskDto) {
    try {
      return await this.dbService.task.create({
        data: createTaskDto,
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

  updateTask(id: number, updateTaskDto: UpdateTaskDto) {
    return this.dbService.task.update({
      where: {
        id,
      },
      data: updateTaskDto,
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
