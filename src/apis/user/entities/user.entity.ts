import { BaseEntity } from '@common';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { hash } from 'argon2';
import { Exclude } from 'class-transformer';
import { BeforeInsert, Column, Entity } from 'typeorm';
import { RoleEnum } from '../user.enum';

@Entity({ name: 'users' })
export class UserEntity extends BaseEntity {
	/** Tài khoản đăng nhập */
	@ApiProperty({ description: 'Tài khoản đăng nhập' })
	@Column({ unique: true })
	username!: string;

	/** Mật khẩu */
	@ApiHideProperty()
	@Column()
	@Exclude()
	password!: string;

	/** Role */
	@ApiProperty({ description: 'Role' })
	@Column({ enum: RoleEnum })
	role!: RoleEnum;

	@BeforeInsert()
	async beforeInsert() {
		this.password = await hash(this.password);
	}
}
