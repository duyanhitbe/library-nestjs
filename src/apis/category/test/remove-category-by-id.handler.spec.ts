import { Test, TestingModule } from '@nestjs/testing';
import { v4 as uuidv4 } from 'uuid';
import { RemoveCategoryByIdCommand } from '../commands/remove-category-by-id.command';
import { RemoveCategoryByIdHandler } from '../handlers/remove-category-by-id.handler';
import { ICategoryService } from '../category.interface';
import { CategoryService } from '../category.service';

jest.mock('../category.service');

describe('RemoveCategoryByIdHandler', () => {
	let handler: RemoveCategoryByIdHandler;
	let categoryService: ICategoryService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				RemoveCategoryByIdHandler,
				{
					provide: ICategoryService,
					useClass: CategoryService
				}
			]
		}).compile();

		handler = module.get<RemoveCategoryByIdHandler>(RemoveCategoryByIdHandler);
		categoryService = module.get<ICategoryService>(ICategoryService);
	});

	it('should be defined', () => {
		expect(handler).toBeDefined();
	});

	it('should call categoryService.softRemoveById with the provided id', async () => {
		const removeCategoryByIdCommand = new RemoveCategoryByIdCommand({
			id: uuidv4()
		});

		await handler.execute(removeCategoryByIdCommand);
		const { id } = removeCategoryByIdCommand;

		expect(categoryService.softRemoveById).toHaveBeenCalledWith(id);
	});
});
