import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { PojectMemberService } from './poject_member.service';
import { CreatePojectMemberDto } from './dto/create-poject_member.dto';
import { UpdatePojectMemberDto } from './dto/update-poject_member.dto';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import type { AuthUser } from '../auth/types/auth-user.type';
import { JwtAuthGuard } from '../auth/guards/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('poject-member')
export class PojectMemberController {
  constructor(private readonly pojectMemberService: PojectMemberService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  create(
    @Body() createPojectMemberDto: CreatePojectMemberDto,
    @CurrentUser() user: AuthUser,
    @Param('projectId', ParseIntPipe) projectId: number,
  ) {
    return this.pojectMemberService.create(
      createPojectMemberDto,
      user.userId,
      projectId,
    );
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  findAll(
    @Param('projectId', ParseIntPipe) projectId: number,
    @CurrentUser() user: AuthUser,
  ) {
    return this.pojectMemberService.findAll(projectId, user.userId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePojectMemberDto: UpdatePojectMemberDto,
  ) {
    return this.pojectMemberService.update(+id, updatePojectMemberDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pojectMemberService.remove(+id);
  }
}
