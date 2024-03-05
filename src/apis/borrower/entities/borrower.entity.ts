import { BookEntity } from '@app/apis/book/entities/book.entity';
import { BaseEntity } from '@common';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';

@Entity({ name: 'borrowers' })
export class BorrowerEntity extends BaseEntity {
	/** Tên người mượn sách */
	@ApiProperty({ description: 'Tên người mượn sách' })
	@Column()
	name!: string;

	/** Số điện thoại người mượn sách */
	@ApiProperty({ description: 'Số điện thoại người mượn sách' })
	@Column()
	phone!: string;

	/** Địa chỉ người mượn sách */
	@ApiProperty({ description: 'Địa chỉ người mượn sách' })
	@Column()
	address!: string;

	/** Danh sách sách */
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
