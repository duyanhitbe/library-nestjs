import { BorrowBookDto } from '../dto/borrow-book.dto';

export class BorrowBookCommand {
	data!: BorrowBookDto;

	constructor(data: BorrowBookCommand) {
		Object.assign(this, data);
	}
}
