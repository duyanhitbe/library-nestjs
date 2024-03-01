import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { IBookService } from '../book.interface';
import { CreateBookCommand } from '../commands/create-book.command';

@CommandHandler(CreateBookCommand)
export class CreateBookHandler implements ICommandHandler<CreateBookCommand> {
	private logger = new Logger(CreateBookHandler.name);

	constructor(private readonly bookService: IBookService) {}

	async execute(command: CreateBookCommand) {
		this.logger.debug('execute');
		const { data } = command;
		const {} = data;
		return this.bookService.create(data);
	}
}
