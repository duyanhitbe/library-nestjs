import { UpdateCategoryByIdDto } from '../dto/update-category-by-id.dto';

export class UpdateCategoryByIdCommand {
	id!: string;
	data!: UpdateCategoryByIdDto;

	constructor(data: UpdateCategoryByIdCommand) {
		Object.assign(this, data);
	}
}
