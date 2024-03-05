import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IBorrowerService } from './borrower.interface';
import { BorrowerEntity } from './entities/borrower.entity';

@Injectable()
export class BorrowerService extends IBorrowerService {
	notFoundMessage = 'Không tìm thấy Borrower';

	constructor(
		@InjectRepository(BorrowerEntity) private readonly borrowerRepo: Repository<BorrowerEntity>
	) {
		super(borrowerRepo);
	}

	async getAllPaginatedByBookId(
		borrowerId: string,
		options: FindPaginatedOptions<BorrowerEntity>
	): Promise<IPaginationResponse<BorrowerEntity>> {
		return this.getAllPaginated({
			...options,
			where: {
				books: {
					id: borrowerId
				}
			},
			relations: ['books']
		});
	}
}
