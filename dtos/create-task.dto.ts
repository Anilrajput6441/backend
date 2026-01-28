import {
  IsString,
  IsOptional,
  IsInt,
  IsEnum,
  IsNotEmpty
} from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title;

  @IsOptional()
  @IsString()
  description;

  @IsInt()
  assignedTo; // EMPLOYEE userId

  @IsInt()
  customerId;

  @IsOptional()
  @IsEnum(['PENDING', 'IN_PROGRESS', 'DONE'])
  status;
}
