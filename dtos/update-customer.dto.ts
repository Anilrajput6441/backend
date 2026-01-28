import {
  IsString,
  IsEmail,
  IsOptional
} from 'class-validator';

export class UpdateCustomerDto {
  @IsOptional()
  @IsString()
  name;

  @IsOptional()
  @IsEmail()
  email;

  @IsOptional()
  @IsString()
  phone;

  @IsOptional()
  @IsString()
  company;
}
