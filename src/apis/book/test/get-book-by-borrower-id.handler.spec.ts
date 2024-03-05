import { Test, TestingModule } from '@nestjs/testing';
import { GetBookByBorrowerIdCommand } from '../commands/get-book-by-borrower-id.command';
import { GetBookByBorrowerIdHandler } from '../handlers/get-book-by-borrower-id.handler';

describe('GetBookByBorrowerIdHandler', () => {
	let handler: GetBookByBorrowerIdHandler;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				GetBookByBorrowerIdHandler
			]
		}).compile();

		handler = module.get<GetBookByBorrowerIdHandler>(GetBookByBorrowerIdHandler);
	});

	it('should be defined', () => {
		expect(handler).toBeDefined();
	});
});

