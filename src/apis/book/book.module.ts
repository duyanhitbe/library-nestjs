import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookInfoModule } from '../book-info/book-info.module';
import { BorrowerModule } from '../borrower/borrower.module';
import { CategoryModule } from '../category/category.module';
import { BookController } from './book.controller';
import { IBookService } from './book.interface';
import { BookService } from './book.service';
import { BookEntity } from './entities/book.entity';
import { BorrowBookHandler } from './handlers/borrow-book.handler';
import { CreateBookHandler } from './handlers/create-book.handler';
import { GetAllBookPaginatedHandler } from './handlers/get-all-book-paginated.handler';
import { GetBookByBorrowerIdHandler } from './handlers/get-book-by-borrower-id.handler';
import { GetOneBookByIdHandler } from './handlers/get-one-book-by-id.handler';
import { RemoveBookByIdHandler } from './handlers/remove-book-by-id.handler';
import { UpdateBookByIdHandler } from './handlers/update-book-by-id.handler';

@Module({
	imports: [
		TypeOrmModule.forFeature([BookEntity]),
		CategoryModule,
		BookInfoModule,
		BorrowerModule
	],
	controllers: [BookController],
	providers: [
		{
			provide: IBookService,
			useClass: BookService
		},
		CreateBookHandler,
		GetAllBookPaginatedHandler,
		GetOneBookByIdHandler,
		RemoveBookByIdHandler,
		UpdateBookByIdHandler,
		BorrowBookHandler,
		GetBookByBorrowerIdHandler
	],
	exports: [IBookService]
})
export class BookModule {}
