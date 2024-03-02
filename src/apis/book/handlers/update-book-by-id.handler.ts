import { ICategoryService } from '@app/apis/category/category.interface';
import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { IBookService } from '../book.interface';
import { UpdateBookByIdCommand } from '../commands/update-book-by-id.command';

@CommandHandler(UpdateBookByIdCommand)
export class UpdateBookByIdHandler implements ICommandHandler<UpdateBookByIdCommand> {
	private logger = new Logger(UpdateBookByIdHandler.name);

	constructor(
		private readonly bookService: IBookService,
		private readonly categoryService: ICategoryService
	) {}

	async execute(command: UpdateBookByIdCommand) {
		this.logger.log(command);
		const { id, data } = command;
		const { categoryId, name, author, publicationDate } = data;
		const book = await this.bookService.getOneByIdOrFail(id, {
			loadEagerRelations: false,
			relations: ['bookInfo']
		});
		if (categoryId) {
			const category = await this.categoryService.getOneByIdOrFail(categoryId);
			book.category = category;
		}
		const bookInfo = book.bookInfo;
		if (bookInfo) {
			bookInfo.name = name || bookInfo.name;
			bookInfo.author = author || bookInfo.author;
			bookInfo.publicationDate = new Date(publicationDate || bookInfo.publicationDate);
			book.bookInfo = await bookInfo.save();
		}
		return this.bookService.updateById(id, book);
	}
}
