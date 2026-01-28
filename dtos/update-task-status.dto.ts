import { IsEnum } from 'class-validator';

export class UpdateTaskStatusDto {
  @IsEnum(['PENDING', 'IN_PROGRESS', 'DONE'], {
    message: 'Status must be PENDING, IN_PROGRESS, or DONE'
  })
  status;
}
