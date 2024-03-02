import { IUserService } from '@apis/user/user.interface';
import { UserService } from '@apis/user/user.service';
import { random } from '@app/common';
import { Test, TestingModule } from '@nestjs/testing';
import { v4 as uuidv4 } from 'uuid';
import { IBookService } from '../book.interface';
import { BookService } from '../book.service';
import { UpdateBookByIdCommand } from '../commands/update-book-by-id.command';
import { UpdateBookByIdHandler } from '../handlers/update-book-by-id.handler';
import { IBookInfoService } from '@app/apis/book-info/book-info.interface';
import { ICategoryService } from '@app/apis/category/category.interface';
import { CategoryService } from '@app/apis/category/category.service';
import { BookInfoService } from '@app/apis/book-info/book-info.service';

jest.mock('../book.service');
jest.mock('../../category/category.service');
jest.mock('../../book-info/book-info.service');

describe('UpdateBookByIdHandler', () => {
	let handler: UpdateBookByIdHandler;
	let bookService: IBookService;
	let categoryService: ICategoryService;
	let bookInfoService: IBookInfoService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				UpdateBookByIdHandler,
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

		handler = module.get<UpdateBookByIdHandler>(UpdateBookByIdHandler);
		bookService = module.get<IBookService>(IBookService);
		categoryService = module.get<ICategoryService>(ICategoryService);
		bookInfoService = module.get<IBookInfoService>(IBookInfoService);
	});

	it('should be defined', () => {
		expect(handler).toBeDefined();
	});

	it('should update book', async () => {
		const updateBookByIdCommand = new UpdateBookByIdCommand({
			id: uuidv4(),
			data: {
				name: random(20),
				author: random(10),
				categoryId: '123',
				publicationDate: new Date().toString()
			}
		});

		const book = await handler.execute(updateBookByIdCommand);
		expect(book.category?.id).toEqual(updateBookByIdCommand.data.categoryId);
	});
});
