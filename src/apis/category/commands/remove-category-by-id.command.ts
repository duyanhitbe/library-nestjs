export class RemoveCategoryByIdCommand {
	id!: string;

	constructor(data: RemoveCategoryByIdCommand) {
		Object.assign(this, data);
	}
}
