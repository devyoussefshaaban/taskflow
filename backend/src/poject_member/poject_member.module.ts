import { Module } from '@nestjs/common';
import { PojectMemberService } from './poject_member.service';
import { PojectMemberController } from './poject_member.controller';

@Module({
  controllers: [PojectMemberController],
  providers: [PojectMemberService],
})
export class PojectMemberModule {}
