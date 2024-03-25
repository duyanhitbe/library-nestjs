import { IsNotEmpty, IsString } from '@common';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class LoginUserDto {
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
}

export class LoginUserResponseDto {
	/** Access token */
	@ApiProperty({ description: 'Access token', name: 'access_token' })
	@Expose({ name: 'access_token' })
	accessToken!: string;

	/** Expiration of access token */
	@ApiProperty({ description: 'Expiration of access token', name: 'expires_in' })
	@Expose({ name: 'expires_in' })
	expiresIn!: number;

	constructor(data: LoginUserResponseDto) {
		Object.assign(this, data);
	}
}
