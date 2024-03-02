import { BookInfoEntity } from '@app/apis/book-info/entities/book-info.entity';
import { BorrowerEntity } from '@app/apis/borrower/entities/borrower.entity';
import { CategoryEntity } from '@app/apis/category/entities/category.entity';
import { BaseEntity } from '@common';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToOne } from 'typeorm';

@Entity({ name: 'books' })
export class BookEntity extends BaseEntity {
	/** Mã thông tin sách */
	@ApiProperty({ description: 'Mã thông tin sách' })
	@Column({ name: 'book_info_id' })
	bookInfoId!: string;

	/** Mã loại sách */
	@ApiProperty({ description: 'Mã loại sách' })
	@Column({ name: 'category_id' })
	categoryId!: string;

	/** Thông tin sách */
	@ApiProperty({ description: 'Thông tin sách' })
	@OneToOne(() => BookInfoEntity, { eager: true, onDelete: 'SET NULL' })
	@JoinColumn({ name: 'book_info_id' })
	bookInfo?: BookInfoEntity;

	/** Loại sách */
	@ApiProperty({ description: 'Loại sách' })
	@ManyToOne(() => CategoryEntity, { eager: true })
	@JoinColumn({ name: 'category_id' })
	category?: CategoryEntity;

	/** Danh sách người mượn sách */
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
