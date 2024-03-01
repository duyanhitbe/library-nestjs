import { Test, TestingModule } from '@nestjs/testing';
import { v4 as uuidv4 } from 'uuid';
import { GetOneCategoryByIdCommand } from '../commands/get-one-category-by-id.command';
import { GetOneCategoryByIdHandler } from '../handlers/get-one-category-by-id.handler';
import { ICategoryService } from '../category.interface';
import { CategoryService } from '../category.service';

jest.mock('../category.service');

describe('GetOneCategoryByIdHandler', () => {
	let handler: GetOneCategoryByIdHandler;
	let categoryService: ICategoryService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				GetOneCategoryByIdHandler,
				{
					provide: ICategoryService,
					useClass: CategoryService
				}
			]
		}).compile();

		handler = module.get<GetOneCategoryByIdHandler>(GetOneCategoryByIdHandler);
		categoryService = module.get<ICategoryService>(ICategoryService);
	});

	it('should be defined', () => {
		expect(handler).toBeDefined();
	});

	it('should call categoryService.getOneByIdOrFail with the provided id', async () => {
		const getOneCategoryByIdCommand = new GetOneCategoryByIdCommand({
			id: uuidv4()
		});

		await handler.execute(getOneCategoryByIdCommand);
		const { id } = getOneCategoryByIdCommand;

		expect(categoryService.getOneByIdOrFail).toHaveBeenCalledWith(id);
	});
});
