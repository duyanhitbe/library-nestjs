import { PaginationDto } from '@common';
import { DeepPartial } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { v4 as uuidv4 } from 'uuid';
import { BookEntity } from '../entities/book.entity';

export const BookService = jest.fn().mockReturnValue({
	create: jest.fn((dto: DeepPartial<BookEntity>) => {
		const book = newBook();
		book.category = dto.category as any;
		book.categoryId = dto.category?.id as any;
		book.bookInfo = dto.bookInfo as any;
		return book;
	}),
	getAllPaginated: jest.fn((query: PaginationDto) => {
		const data = [newBook(), newBook()];
		const limit = +(query.limit || 10);
		const page = +(query.page || 10);
		const offset = limit * (page - 1);
		const total = data.length;
		return {
			data: data.slice(offset, limit * page),
			pagination: {
				limit,
				page,
				total
			}
		};
	}),
	getOneByIdOrFail: jest.fn((id: string, options?: Partial<FindOrFailOptions<BookEntity>>) =>
		newBook()
	),
	softRemoveById: jest.fn((id: string) => newBook()),
	updateById: jest.fn((id: string, data: QueryDeepPartialEntity<BookEntity>) => {
		const book = newBook();
		book.category = data.category as any;
		book.bookInfo = data.bookInfo as any;
		return book;
	})
});

function newBook() {
	const book = new BookEntity();
	book.id = uuidv4();
	book.createdAt = new Date();
	book.updatedAt = new Date();

	book.save = async () => {
		return book;
	};

	return book;
}
