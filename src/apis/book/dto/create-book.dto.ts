import { IsDateString, IsNotEmpty, IsString, IsUUID } from '@common';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBookDto {
	/** Mã loại sách */
	@ApiProperty({ description: 'Mã loại sách' })
	@IsUUID()
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
	@ApiProperty({ description: 'Ngày xuất bản' })
	@IsDateString()
	publicationDate!: string;
}
