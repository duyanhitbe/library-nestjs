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
import { CreateCategoryCommand } from './commands/create-category.command';
import { GetAllCategoryPaginatedCommand } from './commands/get-all-category-paginated.command';
import { GetOneCategoryByIdCommand } from './commands/get-one-category-by-id.command';
import { RemoveCategoryByIdCommand } from './commands/remove-category-by-id.command';
import { UpdateCategoryByIdCommand } from './commands/update-category-by-id.command';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryByIdDto } from './dto/update-category-by-id.dto';
import { CategoryEntity } from './entities/category.entity';

@Controller('category')
@ApiController('Category')
export class CategoryController {
	constructor(private readonly commandBus: CommandBus) {}

	@Post()
	@UseUserGuard(RoleEnum.ADMIN, RoleEnum.MANAGER)
	@ApiCreate(CategoryEntity, 'Category')
	create(@Body() createCategoryDto: CreateCategoryDto) {
		return this.commandBus.execute(new CreateCategoryCommand({ data: createCategoryDto }));
	}

	@Get()
	@ApiGetAll(CategoryEntity, 'Category')
	getAll(@Query() query: PaginationDto) {
		return this.commandBus.execute(new GetAllCategoryPaginatedCommand({ query }));
	}

	@Get(':id')
	@ApiGetOne(CategoryEntity, 'Category')
	getOne(@Param('id') id: string) {
		return this.commandBus.execute(new GetOneCategoryByIdCommand({ id }));
	}

	@Patch(':id')
	@UseUserGuard(RoleEnum.ADMIN, RoleEnum.MANAGER)
	@ApiUpdate(CategoryEntity, 'Category')
	update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryByIdDto) {
		return this.commandBus.execute(
			new UpdateCategoryByIdCommand({ id, data: updateCategoryDto })
		);
	}

	@Delete(':id')
	@UseUserGuard(RoleEnum.ADMIN, RoleEnum.MANAGER)
	@ApiDelete(CategoryEntity, 'Category')
	remove(@Param('id') id: string) {
		return this.commandBus.execute(new RemoveCategoryByIdCommand({ id }));
	}
}
