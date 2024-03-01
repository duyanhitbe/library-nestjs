import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BookInfoEntity } from '../entities/book-info.entity';
import { IBookInfoService } from '../book-info.interface';
import { BookInfoService } from '../book-info.service';

const mockBookInfoRepository = jest.fn(() => ({}));

describe('BookInfoService', () => {
	let service: IBookInfoService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				{
					provide: IBookInfoService,
					useClass: BookInfoService
				},
				{
					provide: getRepositoryToken(BookInfoEntity),
					useFactory: mockBookInfoRepository
				}
			]
		}).compile();

		service = module.get<IBookInfoService>(IBookInfoService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
