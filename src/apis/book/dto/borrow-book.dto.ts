import { BookInfoEntity } from '@app/apis/book-info/entities/book-info.entity';
import { BorrowerEntity } from '@app/apis/borrower/entities/borrower.entity';
import { CategoryEntity } from '@app/apis/category/entities/category.entity';
import { IsNotEmpty, IsString, IsUUID } from '@common';
import { ApiHideProperty, ApiProperty, OmitType } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';
import { BookEntity } from '../entities/book.entity';

export class BorrowBookDto {
	/** Mã sách */
	@ApiProperty({ description: 'Mã sách', name: 'book_id' })
	@IsUUID()
	@Expose({ name: 'book_id' })
	bookId!: string;

	/** Tên người mượn sách */
	@ApiProperty({ description: 'Tên người mượn sách' })
	@IsString()
	@IsNotEmpty()
	name!: string;

	/** Số điện thoại người mượn sách */
	@ApiProperty({ description: 'Số điện thoại người mượn sách' })
	@IsString()
	@IsNotEmpty()
	phone!: string;

	/** Địa chỉ người mượn sách */
	@ApiProperty({ description: 'Địa chỉ người mượn sách' })
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
