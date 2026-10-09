import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { RegisterDto } from './dto/register.dto';
import bcrypt from 'bcrypt';
import { Prisma } from '../../generated/prisma/client';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly dbService: DatabaseService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    try {
      const isExist = await this.dbService.user.findUnique({
        where: {
          email: registerDto.email,
        },
      });

      if (isExist) {
        throw new UnauthorizedException('User with same email exists.');
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
          throw new ConflictException('A user with this email already exists.');
        }
      }
      throw error;
    }
  }

  async login(loginDto: LoginDto) {
    const user = await this.dbService.user.findUnique({
      where: {
        email: loginDto.email,
      },
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    if (!(await bcrypt.compare(loginDto.password, user.passwordHash))) {
      throw new UnauthorizedException('Incorrect mail or password');
    }

    // Generate Token
    const accessToken = await this.jwtService.signAsync({
      sub: user.id,
      email: user.email,
    });

    return {
      accessToken,
    };
  }

  async getMe(id: number) {
    const user = await this.dbService.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Unauthorized. No token.');
    }

    return user;
  }
}
