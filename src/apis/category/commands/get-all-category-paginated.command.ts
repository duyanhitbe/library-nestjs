import { PaginationDto } from '@common';

export class GetAllCategoryPaginatedCommand {
	query!: PaginationDto;

	constructor(data: GetAllCategoryPaginatedCommand) {
		Object.assign(this, data);
	}
}
