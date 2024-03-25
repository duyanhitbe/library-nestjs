import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ICategoryService } from './category.interface';
import { CategoryEntity } from './entities/category.entity';

@Injectable()
export class CategoryService extends ICategoryService {
	notFoundMessage = 'Category not found';

	constructor(
		@InjectRepository(CategoryEntity) private readonly categoryRepo: Repository<CategoryEntity>
	) {
		super(categoryRepo);
	}
}
