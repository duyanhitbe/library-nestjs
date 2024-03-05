import {
	ApiController,
	ApiCreate,
	ApiDelete,
	ApiGetAll,
	ApiGetOne,
	ApiUpdate,
	PaginationDto,
	UseUserGuard,
	getBaseSchema
} from '@common';
import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Query } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { RoleEnum } from '../user/user.enum';
import { BorrowBookCommand } from './commands/borrow-book.command';
import { CreateBookCommand } from './commands/create-book.command';
import { GetAllBookPaginatedCommand } from './commands/get-all-book-paginated.command';
import { GetBookByBorrowerIdCommand } from './commands/get-book-by-borrower-id.command';
import { GetOneBookByIdCommand } from './commands/get-one-book-by-id.command';
import { RemoveBookByIdCommand } from './commands/remove-book-by-id.command';
import { UpdateBookByIdCommand } from './commands/update-book-by-id.command';
import { BorrowBookDto, BorrowBookResponse } from './dto/borrow-book.dto';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookByIdDto } from './dto/update-book-by-id.dto';
import { BookEntity } from './entities/book.entity';

@Controller('book')
@ApiController('Book')
export class BookController {
	constructor(private readonly commandBus: CommandBus) {}

	@Post()
	@UseUserGuard(RoleEnum.ADMIN, RoleEnum.MANAGER)
	@ApiCreate(BookEntity, 'Book')
	create(@Body() createBookDto: CreateBookDto) {
		return this.commandBus.execute(new CreateBookCommand({ data: createBookDto }));
	}

	@Get()
	@ApiGetAll(BookEntity, 'Book')
	getAll(@Query() query: PaginationDto) {
		return this.commandBus.execute(new GetAllBookPaginatedCommand({ query }));
	}

	@Get(':id')
	@ApiGetOne(BookEntity, 'Book')
	getOne(@Param('id') id: string) {
		return this.commandBus.execute(new GetOneBookByIdCommand({ id }));
	}

	@Patch(':id')
	@UseUserGuard(RoleEnum.ADMIN, RoleEnum.MANAGER)
	@ApiUpdate(BookEntity, 'Book')
	update(@Param('id') id: string, @Body() updateBookDto: UpdateBookByIdDto) {
		return this.commandBus.execute(new UpdateBookByIdCommand({ id, data: updateBookDto }));
	}

	@Delete(':id')
	@UseUserGuard(RoleEnum.ADMIN, RoleEnum.MANAGER)
	@ApiDelete(BookEntity, 'Book')
	remove(@Param('id') id: string) {
		return this.commandBus.execute(new RemoveBookByIdCommand({ id }));
	}

	@Post('/borrow')
	@HttpCode(200)
	@UseUserGuard(RoleEnum.ADMIN, RoleEnum.MANAGER)
	@ApiOperation({ summary: 'Cho mượn sách' })
	@ApiOkResponse({
		schema: getBaseSchema(BorrowBookResponse)
	})
	borrowBook(@Body() data: BorrowBookDto) {
		return this.commandBus.execute(new BorrowBookCommand({ data }));
	}

	@Get('/borrow/:borrowerId')
	@HttpCode(200)
	@UseUserGuard(RoleEnum.ADMIN, RoleEnum.MANAGER)
	@ApiOperation({ summary: 'Lấy danh sách sách theo id của người mượn sách' })
	@ApiGetAll(BookEntity, 'Book')
	getBookByBorrower(@Query() query: PaginationDto, @Param('borrowerId') borrowerId: string) {
		return this.commandBus.execute(new GetBookByBorrowerIdCommand({ borrowerId, query }));
	}
}
