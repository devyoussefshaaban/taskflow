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
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import type { AuthUser } from 'src/auth/types/auth-user.type';
import { JwtAuthGuard } from 'src/auth/guards/auth.guard';

@Controller('poject-member')
export class PojectMemberController {
  constructor(private readonly pojectMemberService: PojectMemberService) {}

  @Post()
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
  @UseGuards(JwtAuthGuard)
  findAll(
    @Param('projectId', ParseIntPipe) projectId: number,
    @CurrentUser() user: AuthUser,
  ) {
    return this.pojectMemberService.findAll(projectId, user.userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pojectMemberService.findOne(+id);
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
