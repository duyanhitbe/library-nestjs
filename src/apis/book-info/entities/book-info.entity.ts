import { BaseEntity } from '@common';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'book_infos' })
export class BookInfoEntity extends BaseEntity {
	/** Book name */
	@ApiProperty({ description: 'Book name' })
	@Column()
	name!: string;

	/** Author name */
	@ApiProperty({ description: 'Author name' })
	@Column()
	author!: string;

	/** Publication date */
	@ApiProperty({ description: 'Publication date', name: 'publication_date' })
	@Column({ name: 'publication_date', type: 'timestamptz' })
	@Expose({ name: 'publication_date' })
	publicationDate!: Date;
}
