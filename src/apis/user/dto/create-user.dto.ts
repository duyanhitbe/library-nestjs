import { IsNotEmpty, IsString } from '@common';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { RoleEnum } from '../user.enum';

export class CreateUserDto {
	/** Username login */
	@ApiProperty({ description: 'Username login' })
	@IsString()
	@IsNotEmpty()
	username!: string;

	/** Password login */
	@ApiProperty({ description: 'Password login' })
	@IsString()
	@IsNotEmpty()
	password!: string;

	/** User role */
	@ApiProperty({ description: 'User role' })
	@IsEnum(RoleEnum)
	role!: RoleEnum;
}
