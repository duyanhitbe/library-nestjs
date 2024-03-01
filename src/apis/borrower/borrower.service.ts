import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BorrowerEntity } from './entities/borrower.entity';
import { IBorrowerService } from './borrower.interface';

@Injectable()
export class BorrowerService extends IBorrowerService {
	notFoundMessage = 'Không tìm thấy Borrower';

	constructor(@InjectRepository(BorrowerEntity) private readonly borrowerRepo: Repository<BorrowerEntity>) {
		super(borrowerRepo);
	}
}
