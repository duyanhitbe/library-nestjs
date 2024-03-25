import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
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

	/** Created at */
	@ApiProperty({ description: 'Created at', name: 'created_at' })
	@CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
	@Expose({ name: 'created_at' })
	createdAt!: Date;

	/** Updated at */
	@ApiProperty({ description: 'Updated at', name: 'updated_at' })
	@UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
	@Expose({ name: 'updated_at' })
	updatedAt!: Date;

	/** Deleted at */
	@ApiProperty({ description: 'Deleted at', name: 'deleted_at' })
	@DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz' })
	@Expose({ name: 'deleted_at' })
	deletedAt?: Date | null;

	/** Active */
	@ApiProperty({ description: 'Active', name: 'is_active' })
	@Column({ name: 'is_active', default: true })
	@Expose({ name: 'is_active' })
	isActive!: boolean;
}
