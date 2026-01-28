import {
  IsString,
  IsEmail,
  IsOptional,
  IsNotEmpty
} from 'class-validator';

export class CreateCustomerDto {
  @IsString()
  @IsNotEmpty()
  name;

  @IsEmail()
  email;

  @IsString()
  @IsNotEmpty()
  phone;

  @IsOptional()
  @IsString()
  company;
}
