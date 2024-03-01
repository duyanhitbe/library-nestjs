import { CreateCategoryDto } from '../dto/create-category.dto';

export class CreateCategoryCommand {
	data!: CreateCategoryDto;

	constructor(data: CreateCategoryCommand) {
		Object.assign(this, data);
	}
}
