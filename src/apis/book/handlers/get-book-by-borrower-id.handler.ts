import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { IBookService } from '../book.interface';
import { GetBookByBorrowerIdCommand } from '../commands/get-book-by-borrower-id.command';

@CommandHandler(GetBookByBorrowerIdCommand)
export class GetBookByBorrowerIdHandler implements ICommandHandler<GetBookByBorrowerIdCommand> {
	private logger = new Logger(GetBookByBorrowerIdHandler.name);

	constructor(private readonly bookService: IBookService) {}

	async execute(command: GetBookByBorrowerIdCommand) {
		this.logger.debug('execute');
		const { borrowerId, query } = command;
		return this.bookService.getAllPaginatedByBorrowerId(borrowerId, query);
	}
}
