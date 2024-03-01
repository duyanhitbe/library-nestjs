import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CategoryEntity } from '../entities/category.entity';
import { ICategoryService } from '../category.interface';
import { CategoryService } from '../category.service';

const mockCategoryRepository = jest.fn(() => ({}));

describe('CategoryService', () => {
	let service: ICategoryService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				{
					provide: ICategoryService,
					useClass: CategoryService
				},
				{
					provide: getRepositoryToken(CategoryEntity),
					useFactory: mockCategoryRepository
				}
			]
		}).compile();

		service = module.get<ICategoryService>(ICategoryService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
