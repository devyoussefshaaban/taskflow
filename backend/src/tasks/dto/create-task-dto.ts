import { IsNotEmpty, IsString, MinLength } from 'class-validator';

/*
model Task {
    id          Int      @id @default(autoincrement())
    title       String
    description String
    priority    Priority @default(LOW)
    status      Status   @default(TODO)
    createdAt   DateTime @default(now())
    updatedAt   DateTime @updatedAt
}
*/
export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  title!: string;

  @IsString()
  @MinLength(10)
  @IsNotEmpty()
  description!: string;
}
