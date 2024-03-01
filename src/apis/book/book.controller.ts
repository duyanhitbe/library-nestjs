import {
	ApiController,
	ApiCreate,
	ApiDelete,
	ApiGetAll,
	ApiGetOne,
	ApiUpdate,
	PaginationDto,
	UseUserGuard
} from '@common';
import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { RoleEnum } from '../user/user.enum';
import { CreateBookCommand } from './commands/create-book.command';
import { GetAllBookPaginatedCommand } from './commands/get-all-book-paginated.command';
import { GetOneBookByIdCommand } from './commands/get-one-book-by-id.command';
import { RemoveBookByIdCommand } from './commands/remove-book-by-id.command';
import { UpdateBookByIdCommand } from './commands/update-book-by-id.command';
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
}
