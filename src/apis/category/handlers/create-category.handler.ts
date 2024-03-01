import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateCategoryCommand } from '../commands/create-category.command';
import { ICategoryService } from '../category.interface';

@CommandHandler(CreateCategoryCommand)
export class CreateCategoryHandler implements ICommandHandler<CreateCategoryCommand> {
	private logger = new Logger(CreateCategoryHandler.name);

	constructor(private readonly categoryService: ICategoryService) {}

	async execute(command: CreateCategoryCommand) {
		this.logger.debug('execute');
		const { data } = command;
		return this.categoryService.create(data);
	}
}
