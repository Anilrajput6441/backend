import { IsEnum, IsNotEmpty } from "class-validator";

const Role = {
    ADMIN: 'ADMIN',
    EMPLOYEE: 'EMPLOYEE'
};

export class UpdateUserRoleDto {
    @IsNotEmpty({ message: 'Role is required' })
    @IsEnum(Role, { message: 'Role must be either ADMIN or EMPLOYEE' })
    role;
}