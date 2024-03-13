import { IsNotEmpty, IsString } from '@common';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class LoginUserDto {
	/** Tài khoản đăng nhập */
	@ApiProperty({ description: 'Tài khoản đăng nhập' })
	@IsString()
	@IsNotEmpty()
	username!: string;

	/** Mật khẩu */
	@ApiProperty({ description: 'Mật khẩu' })
	@IsString()
	@IsNotEmpty()
	password!: string;
}

export class LoginUserResponseDto {
	/** Access token */
	@ApiProperty({ description: 'Access token', name: 'access_token' })
	@Expose({ name: 'access_token' })
	accessToken!: string;

	/** Thời hạn của access token */
	@ApiProperty({ description: 'Thời hạn của access token', name: 'expires_in' })
	@Expose({ name: 'expires_in' })
	expiresIn!: number;

	constructor(data: LoginUserResponseDto) {
		Object.assign(this, data);
	}
}
