import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePojectMemberDto {
  @IsString()
  @IsNotEmpty()
  userId!: number;
}
