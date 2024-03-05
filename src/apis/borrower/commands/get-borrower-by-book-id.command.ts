import { PaginationDto } from '@common';

export class GetBorrowerByBookIdCommand {
	bookId!: string;
	query!: PaginationDto;

	constructor(data: GetBorrowerByBookIdCommand) {
		Object.assign(this, data);
	}
}
