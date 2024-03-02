import { IBookInfoService } from '@app/apis/book-info/book-info.interface';
import { BookInfoService } from '@app/apis/book-info/book-info.service';
import { ICategoryService } from '@app/apis/category/category.interface';
import { CategoryService } from '@app/apis/category/category.service';
import { random } from '@app/common';
import { Test, TestingModule } from '@nestjs/testing';
import { IBookService } from '../book.interface';
import { BookService } from '../book.service';
import { CreateBookCommand } from '../commands/create-book.command';
import { CreateBookHandler } from '../handlers/create-book.handler';

jest.mock('../book.service');
jest.mock('../../category/category.service');
jest.mock('../../book-info/book-info.service');

describe('CreateBookHandler', () => {
	let handler: CreateBookHandler;
	let bookService: IBookService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				CreateBookHandler,
				{
					provide: IBookService,
					useClass: BookService
				},
				{
					provide: ICategoryService,
					useClass: CategoryService
				},
				{
					provide: IBookInfoService,
					useClass: BookInfoService
				}
			]
		}).compile();

		handler = module.get<CreateBookHandler>(CreateBookHandler);
		bookService = module.get<IBookService>(IBookService);
	});

	it('should be defined', () => {
		expect(handler).toBeDefined();
	});

	it('should call bookService.create with the provided data', async () => {
		const createBookCommand = new CreateBookCommand({
			data: {
				name: random(20),
				author: random(10),
				categoryId: '123',
				publicationDate: new Date().toString()
			}
		});

		await handler.execute(createBookCommand);

		expect(bookService.create).toHaveBeenCalled();
	});
});
