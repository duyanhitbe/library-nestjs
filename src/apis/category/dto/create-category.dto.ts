import { IsNotEmpty, IsString } from '@common';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
	/** name */
	@ApiProperty({ description: 'name' })
	@IsString()
	@IsNotEmpty()
	name!: string;
}
