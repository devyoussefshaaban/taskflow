import { PartialType } from '@nestjs/mapped-types';
import { CreatePojectMemberDto } from './create-poject_member.dto';

export class UpdatePojectMemberDto extends PartialType(CreatePojectMemberDto) {}
