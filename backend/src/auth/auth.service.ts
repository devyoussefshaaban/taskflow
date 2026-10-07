import { ConflictException, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { RegisterDto } from './dto/register.dto';
import bcrypt from 'bcrypt';
import { Prisma } from 'generated/prisma/client';

@Injectable()
export class AuthService {
  constructor(private readonly dbService: DatabaseService) {}

  async register(registerDto: RegisterDto) {
    try {
      const isExist = await this.dbService.user.findUnique({
        where: {
          email: registerDto.email,
        },
      });

      if (isExist) {
        throw new ConflictException('User with same email exists.');
      }

      const { name, email, password } = registerDto;

      const passwordHash = await bcrypt.hash(password, 10);

      const newUser = await this.dbService.user.create({
        data: {
          name,
          email,
          passwordHash,
        },
      });

      return {
        id: newUser.id,
        name: newUser.email,
        email: newUser.email,
      };
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
}
