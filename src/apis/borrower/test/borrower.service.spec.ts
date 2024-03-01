import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BorrowerEntity } from '../entities/borrower.entity';
import { IBorrowerService } from '../borrower.interface';
import { BorrowerService } from '../borrower.service';

const mockBorrowerRepository = jest.fn(() => ({}));

describe('BorrowerService', () => {
	let service: IBorrowerService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				{
					provide: IBorrowerService,
					useClass: BorrowerService
				},
				{
					provide: getRepositoryToken(BorrowerEntity),
					useFactory: mockBorrowerRepository
				}
			]
		}).compile();

		service = module.get<IBorrowerService>(IBorrowerService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
