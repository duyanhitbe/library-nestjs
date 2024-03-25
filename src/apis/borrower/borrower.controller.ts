import { ApiController, ApiGetAll, PaginationDto, UseUserGuard } from '@common';
import { Controller, Get, HttpCode, Param, Query } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiOperation } from '@nestjs/swagger';
import { RoleEnum } from '../user/user.enum';
import { GetBorrowerByBookIdCommand } from './commands/get-borrower-by-book-id.command';
import { BorrowerEntity } from './entities/borrower.entity';

@Controller('borrower')
@ApiController('Borrower')
export class BorrowerController {
	constructor(private readonly commandBus: CommandBus) {}

	@Get('/book/:bookId')
	@HttpCode(200)
	@UseUserGuard(RoleEnum.ADMIN, RoleEnum.MANAGER)
	@ApiOperation({ summary: 'Get a list of borrowers by book id' })
	@ApiGetAll(BorrowerEntity, 'Borrower')
	getBookByBorrower(@Query() query: PaginationDto, @Param('bookId') bookId: string) {
		return this.commandBus.execute(new GetBorrowerByBookIdCommand({ bookId, query }));
	}
}
