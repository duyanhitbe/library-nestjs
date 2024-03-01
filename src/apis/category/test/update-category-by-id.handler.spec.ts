import { Test, TestingModule } from '@nestjs/testing';
import { v4 as uuidv4 } from 'uuid';
import { UpdateCategoryByIdCommand } from '../commands/update-category-by-id.command';
import { UpdateCategoryByIdHandler } from '../handlers/update-category-by-id.handler';
import { ICategoryService } from '../category.interface';
import { CategoryService } from '../category.service';

jest.mock('../category.service');

describe('UpdateCategoryByIdHandler', () => {
	let handler: UpdateCategoryByIdHandler;
	let categoryService: ICategoryService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				UpdateCategoryByIdHandler,
				{
					provide: ICategoryService,
					useClass: CategoryService
				}
			]
		}).compile();

		handler = module.get<UpdateCategoryByIdHandler>(UpdateCategoryByIdHandler);
		categoryService = module.get<ICategoryService>(ICategoryService);
	});

	it('should be defined', () => {
		expect(handler).toBeDefined();
	});

	it('should call categoryService.create with the provided data', async () => {
		const updateCategoryByIdCommand = new UpdateCategoryByIdCommand({
			id: uuidv4(),
			data: { name: 'category' }
		});

		await handler.execute(updateCategoryByIdCommand);
		const { id, data } = updateCategoryByIdCommand;

		expect(categoryService.updateById).toHaveBeenCalledWith(id, data);
	});
});
