import { BookInfoEntity } from '@app/apis/book-info/entities/book-info.entity';
import { BorrowerEntity } from '@app/apis/borrower/entities/borrower.entity';
import { CategoryEntity } from '@app/apis/category/entities/category.entity';
import { BaseEntity } from '@common';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToOne } from 'typeorm';

@Entity({ name: 'books' })
export class BookEntity extends BaseEntity {
	/** Book info id */
	@ApiProperty({ description: 'Book info id', name: 'book_info_id' })
	@Column({ name: 'book_info_id' })
	@Expose({ name: 'book_info_id' })
	bookInfoId!: string;

	/** Category id */
	@ApiProperty({ description: 'Category id', name: 'category_id' })
	@Column({ name: 'category_id' })
	@Expose({ name: 'category_id' })
	categoryId!: string;

	/** Book info */
	@ApiProperty({ description: 'Book info', name: 'book_info' })
	@OneToOne(() => BookInfoEntity, { eager: true, onDelete: 'SET NULL' })
	@JoinColumn({ name: 'book_info_id' })
	@Expose({ name: 'book_info' })
	bookInfo?: BookInfoEntity;

	/** Category */
	@ApiProperty({ description: 'Category' })
	@ManyToOne(() => CategoryEntity, { eager: true })
	@JoinColumn({ name: 'category_id' })
	category?: CategoryEntity;

	/** List of borrowers borrowed this book */
	@ApiHideProperty()
	@ManyToMany(() => BorrowerEntity, { onDelete: 'CASCADE' })
	@JoinTable({
		name: 'book_borrower',
		joinColumn: {
			name: 'book_id'
		},
		inverseJoinColumn: {
			name: 'borrower_id'
		}
	})
	borrowers?: BorrowerEntity[];
}
