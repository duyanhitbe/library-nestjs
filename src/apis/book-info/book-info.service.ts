import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IBookInfoService } from './book-info.interface';
import { BookInfoEntity } from './entities/book-info.entity';

@Injectable()
export class BookInfoService extends IBookInfoService {
	notFoundMessage = 'BookInfo not found';

	constructor(
		@InjectRepository(BookInfoEntity) private readonly bookInfoRepo: Repository<BookInfoEntity>
	) {
		super(bookInfoRepo);
	}
}
