import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateCategoryByIdCommand } from '../commands/update-category-by-id.command';
import { ICategoryService } from '../category.interface';

@CommandHandler(UpdateCategoryByIdCommand)
export class UpdateCategoryByIdHandler implements ICommandHandler<UpdateCategoryByIdCommand> {
	private logger = new Logger(UpdateCategoryByIdHandler.name);

	constructor(private readonly categoryService: ICategoryService) {}

	async execute(command: UpdateCategoryByIdCommand) {
		this.logger.log(command);
		const { id, data } = command;
		return this.categoryService.updateById(id, data);
	}
}
