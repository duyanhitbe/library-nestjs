import { BookEntity } from '@app/apis/book/entities/book.entity';
import { BaseEntity } from '@common';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';

@Entity({ name: 'borrowers' })
export class BorrowerEntity extends BaseEntity {
	/** Borrower name */
	@ApiProperty({ description: 'Borrower name' })
	@Column()
	name!: string;

	/** Borrower phone */
	@ApiProperty({ description: 'Borrower phone' })
	@Column()
	phone!: string;

	/** Borrower address */
	@ApiProperty({ description: 'Borrower address' })
	@Column()
	address!: string;

	/** List of books this borrower borrow */
	@ApiHideProperty()
	@ManyToMany(() => BookEntity, { onDelete: 'CASCADE' })
	@JoinTable({
		name: 'book_borrower',
		joinColumn: {
			name: 'borrower_id'
		},
		inverseJoinColumn: {
			name: 'book_id'
		}
	})
	@Exclude()
	books?: BookEntity[];
}
