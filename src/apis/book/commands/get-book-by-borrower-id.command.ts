import { PaginationDto } from '@common';

export class GetBookByBorrowerIdCommand {
	borrowerId!: string;
	query!: PaginationDto;

	constructor(data: GetBookByBorrowerIdCommand) {
		Object.assign(this, data);
	}
}
