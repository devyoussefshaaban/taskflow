import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateProjectDto {
  @ApiProperty({ example: 'Project name' })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(30)
  name!: string;

  @ApiProperty({ example: 'Project description ....' })
  @IsNotEmpty()
  @IsString()
  @MinLength(10)
  @MaxLength(300)
  description!: string;
}
