import { IsDateString, IsNotEmpty, IsString, IsUUID } from '@common';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class CreateBookDto {
	/** Mã loại sách */
	@ApiProperty({ description: 'Mã loại sách', name: 'category_id' })
	@IsUUID()
	@Expose({ name: 'category_id' })
	categoryId!: string;

	/** Tên sách */
	@ApiProperty({ description: 'Tên sách' })
	@IsString()
	@IsNotEmpty()
	name!: string;

	/** Tác giả */
	@ApiProperty({ description: 'Tác giả' })
	@IsString()
	@IsNotEmpty()
	author!: string;

	/** Ngày xuất bản */
	@ApiProperty({ description: 'Ngày xuất bản', name: 'publication_date' })
	@IsDateString()
	@Expose({ name: 'publication_date' })
	publicationDate!: string;
}
