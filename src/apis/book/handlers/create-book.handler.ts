import { IBookInfoService } from '@app/apis/book-info/book-info.interface';
import { ICategoryService } from '@app/apis/category/category.interface';
import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { IBookService } from '../book.interface';
import { CreateBookCommand } from '../commands/create-book.command';

@CommandHandler(CreateBookCommand)
export class CreateBookHandler implements ICommandHandler<CreateBookCommand> {
	private logger = new Logger(CreateBookHandler.name);

	constructor(
		private readonly bookService: IBookService,
		private readonly categoryService: ICategoryService,
		private readonly bookInfoService: IBookInfoService
	) {}

	async execute(command: CreateBookCommand) {
		this.logger.debug('execute');
		const { data } = command;
		const { author, categoryId, name, publicationDate } = data;
		const category = await this.categoryService.getOneByIdOrFail(categoryId);
		const bookInfo = await this.bookInfoService.create({ name, author, publicationDate });
		return this.bookService.create({ category, bookInfo });
	}
}
