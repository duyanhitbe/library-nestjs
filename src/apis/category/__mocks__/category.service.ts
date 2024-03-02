import { PaginationDto } from '@common';
import { v4 as uuidv4 } from 'uuid';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryByIdDto } from '../dto/update-category-by-id.dto';

export const CategoryService = jest.fn().mockReturnValue({
	create: jest.fn((dto: CreateCategoryDto) => ({
		...dto,
		id: uuidv4(),
		createdAt: new Date(),
		updatedAt: new Date()
	})),
	getAllPaginated: jest.fn((query: PaginationDto) => {
		const data = [
			{
				id: uuidv4(),
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				id: uuidv4(),
				createdAt: new Date(),
				updatedAt: new Date()
			}
		];
		const limit = query.limit || 10;
		const page = query.page || 10;
		const offset = limit * (page - 1);
		const total = data.length;
		return {
			data: data.slice(offset, limit * page),
			pagination: {
				limit,
				page,
				total
			}
		};
	}),
	getOneByIdOrFail: jest.fn((id: string) => ({
		id,
		createdAt: new Date(),
		updatedAt: new Date()
	})),
	softRemoveById: jest.fn((id: string) => ({
		id,
		createdAt: new Date(),
		updatedAt: new Date()
	})),
	updateById: jest.fn((id: string, data: UpdateCategoryByIdDto) => ({
		...data,
		id,
		createdAt: new Date(),
		updatedAt: new Date()
	}))
});
