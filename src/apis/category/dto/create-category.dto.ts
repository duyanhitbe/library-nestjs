import { IsNotEmpty, IsString } from '@common';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
	/** Category name */
	@ApiProperty({ description: 'Category name' })
	@IsString()
	@IsNotEmpty()
	name!: string;
}
