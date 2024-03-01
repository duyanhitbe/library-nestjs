import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RemoveCategoryByIdCommand } from '../commands/remove-category-by-id.command';
import { ICategoryService } from '../category.interface';

@CommandHandler(RemoveCategoryByIdCommand)
export class RemoveCategoryByIdHandler implements ICommandHandler<RemoveCategoryByIdCommand> {
	private logger = new Logger(RemoveCategoryByIdHandler.name);

	constructor(private readonly categoryService: ICategoryService) {}

	async execute(command: RemoveCategoryByIdCommand) {
		this.logger.log(command);
		const { id } = command;
		return this.categoryService.softRemoveById(id);
	}
}
