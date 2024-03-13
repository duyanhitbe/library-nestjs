import { BaseEntity } from '@common';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
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
	@ApiProperty({ description: 'Ngày xuất bản', name: 'publication_date' })
	@Column({ name: 'publication_date', type: 'timestamptz' })
	@Expose({ name: 'publication_date' })
	publicationDate!: Date;
}
