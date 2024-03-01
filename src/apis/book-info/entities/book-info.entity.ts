import { BaseEntity } from '@common';
import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'book_infos' })
export class BookInfoEntity extends BaseEntity {
	/** name */
	@ApiProperty({ description: 'name' })
	@Column()
	name!: string;

	/** Tác giả */
	@ApiProperty({ description: 'Tác giả' })
	@Column()
	author!: string;

	/** Ngày xuất bản */
	@ApiProperty({ description: 'Ngày xuất bản' })
	@Column({ name: 'publish_date', type: 'timestamptz' })
	publishDate!: Date;
}
