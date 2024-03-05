import { IBorrowerService } from '@app/apis/borrower/borrower.interface';
import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { IBookService } from '../book.interface';
import { BorrowBookCommand } from '../commands/borrow-book.command';
import { BorrowBookResponse } from '../dto/borrow-book.dto';

@CommandHandler(BorrowBookCommand)
export class BorrowBookHandler implements ICommandHandler<BorrowBookCommand, BorrowBookResponse> {
	private logger = new Logger(BorrowBookHandler.name);

	constructor(
		private readonly bookService: IBookService,
		private readonly borrowerService: IBorrowerService
	) {}

	async execute(command: BorrowBookCommand) {
		this.logger.debug('execute');
		const { data } = command;
		const { bookId, name, phone, address } = data;

		const book = await this.bookService.getOneByIdOrFail(bookId, {
			relations: ['borrowers']
		});
		let borrower = await this.borrowerService.getOne({ where: { phone } });
		if (!borrower) {
			borrower = await this.borrowerService.create({
				name,
				phone,
				address
			});
		} else {
			borrower.name = name;
			borrower.phone = phone;
			await borrower.save();
		}
		if (book.borrowers) {
			const borrowerIds = book.borrowers.map((borrower) => borrower.id);
			if (!borrowerIds.includes(borrower.id)) {
				book.borrowers.push(borrower);
			}
		}
		book.save();
		return new BorrowBookResponse({
			book,
			borrower
		});
	}
}
