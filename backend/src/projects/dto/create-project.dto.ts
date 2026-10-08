import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(30)
  name!: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(10)
  @MaxLength(300)
  description!: string;
}
