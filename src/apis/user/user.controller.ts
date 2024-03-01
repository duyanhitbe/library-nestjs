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
import { CreateUserCommand } from './commands/create-user.command';
import { GetAllUserPaginatedCommand } from './commands/get-all-user-paginated.command';
import { GetOneUserByIdCommand } from './commands/get-one-user-by-id.command';
import { RemoveUserByIdCommand } from './commands/remove-user-by-id.command';
import { UpdateUserByIdCommand } from './commands/update-user-by-id.command';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserByIdDto } from './dto/update-user-by-id.dto';
import { UserEntity } from './entities/user.entity';
import { RoleEnum } from './user.enum';

@Controller('user')
@ApiController('User')
export class UserController {
	constructor(private readonly commandBus: CommandBus) {}

	@Post()
	@UseUserGuard(RoleEnum.ADMIN)
	@ApiCreate(UserEntity, 'User')
	create(@Body() createUserDto: CreateUserDto) {
		return this.commandBus.execute(new CreateUserCommand({ data: createUserDto }));
	}

	@Get()
	@UseUserGuard(RoleEnum.ADMIN)
	@ApiGetAll(UserEntity, 'User')
	getAll(@Query() query: PaginationDto) {
		return this.commandBus.execute(new GetAllUserPaginatedCommand({ query }));
	}

	@Get(':id')
	@UseUserGuard(RoleEnum.ADMIN)
	@ApiGetOne(UserEntity, 'User')
	getOne(@Param('id') id: string) {
		return this.commandBus.execute(new GetOneUserByIdCommand({ id }));
	}

	@Patch(':id')
	@UseUserGuard(RoleEnum.ADMIN)
	@ApiUpdate(UserEntity, 'User')
	update(@Param('id') id: string, @Body() updateUserDto: UpdateUserByIdDto) {
		return this.commandBus.execute(new UpdateUserByIdCommand({ id, data: updateUserDto }));
	}

	@Delete(':id')
	@UseUserGuard(RoleEnum.ADMIN)
	@ApiDelete(UserEntity, 'User')
	remove(@Param('id') id: string) {
		return this.commandBus.execute(new RemoveUserByIdCommand({ id }));
	}
}
