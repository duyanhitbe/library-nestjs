import { BookInfoEntity } from '@app/apis/book-info/entities/book-info.entity';
import { BorrowerEntity } from '@app/apis/borrower/entities/borrower.entity';
import { CategoryEntity } from '@app/apis/category/entities/category.entity';
import { IsNotEmpty, IsString, IsUUID } from '@common';
import { ApiHideProperty, ApiProperty, OmitType } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';
import { BookEntity } from '../entities/book.entity';

export class BorrowBookDto {
	/** Book's id */
	@ApiProperty({ description: "Book's id", name: 'book_id' })
	@IsUUID()
	@Expose({ name: 'book_id' })
	bookId!: string;

	/** Borrower name */
	@ApiProperty({ description: 'Borrower name' })
	@IsString()
	@IsNotEmpty()
	name!: string;

	/** Borrower phone */
	@ApiProperty({ description: 'Borrower phone' })
	@IsString()
	@IsNotEmpty()
	phone!: string;

	/** Borrower address */
	@ApiProperty({ description: 'Borrower address' })
	@IsString()
	@IsNotEmpty()
	address!: string;
}

class BookResponse extends OmitType(BookEntity, ['borrowers', 'bookInfo', 'category']) {
	@ApiHideProperty()
	@Exclude()
	borrowers?: BorrowerEntity[] | undefined;

	@ApiHideProperty()
	@Exclude()
	category?: CategoryEntity | undefined;

	@ApiHideProperty()
	@Exclude()
	bookInfo?: BookInfoEntity | undefined;
}

export class BorrowBookResponse {
	@ApiProperty({ description: 'Thông tin sách', type: BookResponse })
	@Type(() => BookResponse)
	book!: BookResponse;

	@ApiProperty({ description: 'Thông tin người mượn sách' })
	borrower!: BorrowerEntity;

	constructor(data: BorrowBookResponse) {
		Object.assign(this, data);
	}
}
