import { IsDateString, IsNotEmpty, IsString, IsUUID } from '@common';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class CreateBookDto {
	/** Category id */
	@ApiProperty({ description: 'Category id', name: 'category_id' })
	@IsUUID()
	@Expose({ name: 'category_id' })
	categoryId!: string;

	/** Book name */
	@ApiProperty({ description: 'Book name' })
	@IsString()
	@IsNotEmpty()
	name!: string;

	/** Author name */
	@ApiProperty({ description: 'Author name' })
	@IsString()
	@IsNotEmpty()
	author!: string;

	/** Publication date */
	@ApiProperty({ description: 'Publication date', name: 'publication_date' })
	@IsDateString()
	@Expose({ name: 'publication_date' })
	publicationDate!: string;
}
