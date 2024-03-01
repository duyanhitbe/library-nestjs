import { Test, TestingModule } from '@nestjs/testing';
import { CreateCategoryCommand } from '../commands/create-category.command';
import { CreateCategoryHandler } from '../handlers/create-category.handler';
import { ICategoryService } from '../category.interface';
import { CategoryService } from '../category.service';

jest.mock('../category.service');

describe('CreateCategoryHandler', () => {
	let handler: CreateCategoryHandler;
	let categoryService: ICategoryService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				CreateCategoryHandler,
				{
					provide: ICategoryService,
					useClass: CategoryService
				}
			]
		}).compile();

		handler = module.get<CreateCategoryHandler>(CreateCategoryHandler);
		categoryService = module.get<ICategoryService>(ICategoryService);
	});

	it('should be defined', () => {
		expect(handler).toBeDefined();
	});

	it('should call categoryService.create with the provided data', async () => {
		const createCategoryCommand = new CreateCategoryCommand({ data: { name: 'category' } });

		await handler.execute(createCategoryCommand);
		const { data } = createCategoryCommand;

		expect(categoryService.create).toHaveBeenCalledWith(data);
	});
});
