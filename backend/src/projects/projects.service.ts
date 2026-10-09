import { ConflictException, Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { DatabaseService } from '../database/database.service';
import { Prisma } from 'generated/prisma/client';

@Injectable()
export class ProjectsService {
  constructor(private readonly dbService: DatabaseService) {}

  async create(createProjectDto: CreateProjectDto, ownerId: number) {
    try {
      const project = await this.dbService.project.findUnique({
        where: {
          ownerId,
          name: createProjectDto.name,
        },
      });

      if (project) throw new ConflictException('Project with same name exists');

      return this.dbService.project.create({
        data: { ...createProjectDto, ownerId },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new ConflictException('Project with same name exists.');
      }
      throw error;
    }
  }

  findAll(ownerId: number, search?: string) {
    return this.dbService.project.findMany({
      where: {
        ownerId,
        ...(search && {
          OR: [
            {
              name: {
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
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  findOne(id: number, ownerId: number) {
    return this.dbService.project.findUnique({
      where: {
        id,
        ownerId,
      },
    });
  }

  async update(
    id: number,
    updateProjectDto: UpdateProjectDto,
    ownerId: number,
  ) {
    try {
      const project = await this.dbService.project.findUnique({
        where: {
          id,
          ownerId,
        },
      });

      if (!project) throw new ConflictException('Project not found');

      return await this.dbService.project.update({
        where: {
          id,
          ownerId,
        },
        data: updateProjectDto,
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2001') {
          throw new ConflictException('Project with same name already exists');
        }
      }
      throw error;
    }
  }

  async remove(id: number, ownerId: number) {
    try {
      const project = await this.dbService.project.findUnique({
        where: {
          id,
          ownerId,
        },
      });

      if (!project) throw new ConflictException('Project not found');

      return await this.dbService.project.delete({
        where: {
          id,
          ownerId,
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2001') {
          throw new ConflictException('Project with same name already exists');
        }
      }
      throw error;
    }
  }
}
