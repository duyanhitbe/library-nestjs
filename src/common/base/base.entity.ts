import { ApiProperty } from '@nestjs/swagger';
import {
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	PrimaryGeneratedColumn,
	BaseEntity as TypeormBaseEntity,
	UpdateDateColumn
} from 'typeorm';

export class BaseEntity extends TypeormBaseEntity {
	/** uuid */
	@ApiProperty({ description: 'uuid' })
	@PrimaryGeneratedColumn('uuid')
	id!: string;

	/** Ngày tạo */
	@ApiProperty({ description: 'Ngày tạo' })
	@CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
	createdAt!: Date;

	/** Lần cuối update */
	@ApiProperty({ description: 'Lần cuối update' })
	@UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
	updatedAt!: Date;

	/** Ngày xoá */
	@ApiProperty({ description: 'Ngày xoá' })
	@DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz' })
	deletedAt?: Date | null;

	/** Kích hoạt */
	@ApiProperty({ description: 'Kích hoạt' })
	@Column({ name: 'is_active', default: true })
	isActive!: boolean;
}
