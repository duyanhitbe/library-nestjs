import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { GetOneCategoryByIdCommand } from '../commands/get-one-category-by-id.command';
import { ICategoryService } from '../category.interface';

@CommandHandler(GetOneCategoryByIdCommand)
export class GetOneCategoryByIdHandler implements ICommandHandler<GetOneCategoryByIdCommand> {
	private logger = new Logger(GetOneCategoryByIdHandler.name);

	constructor(private readonly categoryService: ICategoryService) {}

	async execute(command: GetOneCategoryByIdCommand) {
		this.logger.log(command);
		const { id } = command;
		return this.categoryService.getOneByIdOrFail(id);
	}
}
