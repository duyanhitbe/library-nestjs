import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ICategoryService } from '../category.interface';
import { GetAllCategoryPaginatedCommand } from '../commands/get-all-category-paginated.command';

@CommandHandler(GetAllCategoryPaginatedCommand)
export class GetAllCategoryPaginatedHandler
	implements ICommandHandler<GetAllCategoryPaginatedCommand>
{
	private logger = new Logger(GetAllCategoryPaginatedHandler.name);

	constructor(private readonly categoryService: ICategoryService) {}

	async execute(command: GetAllCategoryPaginatedCommand) {
		this.logger.log(command);
		const { query } = command;
		return this.categoryService.getAllPaginated(query);
	}
}
