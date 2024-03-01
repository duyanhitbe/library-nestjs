import { BookInfoEntity } from '@app/apis/book-info/entities/book-info.entity';
import { BorrowerEntity } from '@app/apis/borrower/entities/borrower.entity';
import { CategoryEntity } from '@app/apis/category/entities/category.entity';
import { BaseEntity } from '@common';
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToOne } from 'typeorm';

@Entity({ name: 'books' })
export class BookEntity extends BaseEntity {
	@Column({ name: 'book_info_id' })
	bookInfoId!: string;

	@Column({ name: 'category_id' })
	categoryId!: string;

	@OneToOne(() => BookInfoEntity, { eager: true, onDelete: 'SET NULL' })
	@JoinColumn({ name: 'book_info_id' })
	bookInfo?: BookInfoEntity;

	@ManyToOne(() => CategoryEntity, { eager: true })
	@JoinColumn({ name: 'category_id' })
	category?: CategoryEntity;

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
