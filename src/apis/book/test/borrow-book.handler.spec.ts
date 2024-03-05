import { Test, TestingModule } from '@nestjs/testing';
import { BorrowBookCommand } from '../commands/borrow-book.command';
import { BorrowBookHandler } from '../handlers/borrow-book.handler';

describe('BorrowBookHandler', () => {
	let handler: BorrowBookHandler;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				BorrowBookHandler
			]
		}).compile();

		handler = module.get<BorrowBookHandler>(BorrowBookHandler);
	});

	it('should be defined', () => {
		expect(handler).toBeDefined();
	});
});

