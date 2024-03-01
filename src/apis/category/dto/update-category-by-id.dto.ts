import { PartialType } from '@nestjs/swagger';
import { CreateCategoryDto } from './create-category.dto';

export class UpdateCategoryByIdDto extends PartialType(CreateCategoryDto) {}
