import { BaseService } from '@common';
import { BorrowerEntity } from './entities/borrower.entity';

export abstract class IBorrowerService extends BaseService<BorrowerEntity> {
    /** Get a list of borrowers by book id */
    abstract getAllPaginatedByBookId(bookId: string, options: FindPaginatedOptions<BorrowerEntity>): Promise<IPaginationResponse<BorrowerEntity>>;
}
