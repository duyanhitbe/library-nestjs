import { Test, TestingModule } from '@nestjs/testing';
import { GetAllCategoryPaginatedCommand } from '../commands/get-all-category-paginated.command';
import { GetAllCategoryPaginatedHandler } from '../handlers/get-all-category-paginated.handler';
import { ICategoryService } from '../category.interface';
import { CategoryService } from '../category.service';

jest.mock('../category.service');

describe('GetAllCategoryPaginatedHandler', () => {
	let handler: GetAllCategoryPaginatedHandler;
	let categoryService: ICategoryService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				GetAllCategoryPaginatedHandler,
				{
					provide: ICategoryService,
					useClass: CategoryService
				}
			]
		}).compile();

		handler = module.get<GetAllCategoryPaginatedHandler>(GetAllCategoryPaginatedHandler);
		categoryService = module.get<ICategoryService>(ICategoryService);
	});

	it('should be defined', () => {
		expect(handler).toBeDefined();
	});

	it('should call categoryService.getAllPaginated with the provided query', async () => {
		const getAllCategoryPaginatedCommand = new GetAllCategoryPaginatedCommand({
			query: {
				limit: 10,
				page: 1
			}
		});

		await handler.execute(getAllCategoryPaginatedCommand);
		const { query } = getAllCategoryPaginatedCommand;

		expect(categoryService.getAllPaginated).toHaveBeenCalledWith(query);
	});
});
