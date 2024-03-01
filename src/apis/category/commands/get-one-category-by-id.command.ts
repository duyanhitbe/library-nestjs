export class GetOneCategoryByIdCommand {
	id!: string;

	constructor(data: GetOneCategoryByIdCommand) {
		Object.assign(this, data);
	}
}
