import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEntity } from './entities/category.entity';
import { CreateCategoryHandler } from './handlers/create-category.handler';
import { GetAllCategoryPaginatedHandler } from './handlers/get-all-category-paginated.handler';
import { GetOneCategoryByIdHandler } from './handlers/get-one-category-by-id.handler';
import { RemoveCategoryByIdHandler } from './handlers/remove-category-by-id.handler';
import { UpdateCategoryByIdHandler } from './handlers/update-category-by-id.handler';
import { CategoryController } from './category.controller';
import { ICategoryService } from './category.interface';
import { CategoryService } from './category.service';

@Module({
	imports: [TypeOrmModule.forFeature([CategoryEntity])],
	controllers: [CategoryController],
	providers: [
		{
			provide: ICategoryService,
			useClass: CategoryService
		},
		CreateCategoryHandler,
		GetAllCategoryPaginatedHandler,
		GetOneCategoryByIdHandler,
		RemoveCategoryByIdHandler,
		UpdateCategoryByIdHandler
	],
	exports: [ICategoryService]
})
export class CategoryModule {}
