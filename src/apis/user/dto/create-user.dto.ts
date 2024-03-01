import { IsNotEmpty, IsString } from '@common';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { RoleEnum } from '../user.enum';

export class CreateUserDto {
	@ApiProperty({ description: 'Tên đăng nhập' })
	@IsString()
	@IsNotEmpty()
	username!: string;

	@ApiProperty({ description: 'Mật khẩu đăng nhập' })
	@IsString()
	@IsNotEmpty()
	password!: string;

	@ApiProperty({ description: 'Role' })
	@IsEnum(RoleEnum)
	role!: RoleEnum;
}
