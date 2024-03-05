import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { IBorrowerService } from '../borrower.interface';
import { GetBorrowerByBookIdCommand } from '../commands/get-borrower-by-book-id.command';

@CommandHandler(GetBorrowerByBookIdCommand)
export class GetBorrowerByBookIdHandler implements ICommandHandler<GetBorrowerByBookIdCommand> {
	private logger = new Logger(GetBorrowerByBookIdHandler.name);

	constructor(private readonly borrowerService: IBorrowerService) {}

	async execute(command: GetBorrowerByBookIdCommand) {
		this.logger.debug('execute');
		const { bookId, query } = command;
		return this.borrowerService.getAllPaginatedByBookId(bookId, query);
	}
}
