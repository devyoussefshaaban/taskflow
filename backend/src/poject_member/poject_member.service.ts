import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreatePojectMemberDto } from './dto/create-poject_member.dto';
import { UpdatePojectMemberDto } from './dto/update-poject_member.dto';
import { DatabaseService } from 'src/database/database.service';
import { Prisma } from 'generated/prisma/client';

@Injectable()
export class PojectMemberService {
  constructor(private readonly dbService: DatabaseService) {}

  async create(
    createPojectMemberDto: CreatePojectMemberDto,
    ownerId: number,
    projectId: number,
  ) {
    try {
      const project = await this.dbService.project.findUnique({
        where: {
          id: projectId,
        },
      });

      if (project?.ownerId !== ownerId)
        throw new UnauthorizedException(
          "You're not authorized to manage this project",
        );

      const user = await this.dbService.user.findUnique({
        where: {
          id: createPojectMemberDto.userId,
        },
      });

      if (!user || !project)
        throw new ConflictException('User or Project not found');

      return this.dbService.project_Member.create({
        data: { ...createPojectMemberDto, projectId },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new ConflictException('Project Member exists.');
      }
      throw error;
    }
  }

  async findAll(projectId: number, ownerId: number) {
    try {
      const project = await this.dbService.project.findUnique({
        where: {
          id: projectId,
        },
      });

      if (!project) throw new ConflictException('Project not found');

      if (project.ownerId !== ownerId)
        throw new UnauthorizedException(
          "You're not authorized to manage this project",
        );
      return this.dbService.project_Member.findMany({
        where: {
          projectId,
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException('Project not exists');
        }
      }
      throw error;
    }
  }

  update(id: number, updatePojectMemberDto: UpdatePojectMemberDto) {
    return `This action updates a #${id} pojectMember`;
  }

  remove(id: number) {
    return `This action removes a #${id} pojectMember`;
  }
}
