import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IBookService } from './book.interface';
import { BookEntity } from './entities/book.entity';

@Injectable()
export class BookService extends IBookService {
	notFoundMessage = 'Không tìm thấy Book';

	constructor(@InjectRepository(BookEntity) private readonly bookRepo: Repository<BookEntity>) {
		super(bookRepo);
	}

	async getAllPaginatedByBorrowerId(
		borrowerId: string,
		options: FindPaginatedOptions<BookEntity>
	): Promise<IPaginationResponse<BookEntity>> {
		return this.getAllPaginated({
			...options,
			where: {
				borrowers: {
					id: borrowerId
				}
			},
			relations: ['borrowers']
		});
	}
}
