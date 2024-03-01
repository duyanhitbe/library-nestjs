import { BaseEntity } from '@common';
import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'categories' })
export class CategoryEntity extends BaseEntity {
	/** name */
	@ApiProperty({ description: 'name' })
	@Column()
	name!: string;
}
