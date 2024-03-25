import { BaseEntity } from '@common';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { hash } from 'argon2';
import { Exclude } from 'class-transformer';
import { BeforeInsert, Column, Entity } from 'typeorm';
import { RoleEnum } from '../user.enum';

@Entity({ name: 'users' })
export class UserEntity extends BaseEntity {
	/** Username login */
	@ApiProperty({ description: 'Username login' })
	@Column({ unique: true })
	username!: string;

	/** Password login */
	@ApiHideProperty()
	@Column()
	@Exclude()
	password!: string;

	/** User role */
	@ApiProperty({ description: 'User role' })
	@Column({ enum: RoleEnum })
	role!: RoleEnum;

	@BeforeInsert()
	async beforeInsert() {
		this.password = await hash(this.password);
	}
}
