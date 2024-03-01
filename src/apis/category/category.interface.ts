import { BaseService } from '@common';
import { CategoryEntity } from './entities/category.entity';

export abstract class ICategoryService extends BaseService<CategoryEntity> {}
