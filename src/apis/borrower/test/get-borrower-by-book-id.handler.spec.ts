import { Test, TestingModule } from '@nestjs/testing';
import { GetBorrowerByBookIdCommand } from '../commands/get-borrower-by-book-id.command';
import { GetBorrowerByBookIdHandler } from '../handlers/get-borrower-by-book-id.handler';

describe('GetBorrowerByBookIdHandler', () => {
	let handler: GetBorrowerByBookIdHandler;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				GetBorrowerByBookIdHandler
			]
		}).compile();

		handler = module.get<GetBorrowerByBookIdHandler>(GetBorrowerByBookIdHandler);
	});

	it('should be defined', () => {
		expect(handler).toBeDefined();
	});
});

