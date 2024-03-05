import { BaseService } from '@common';
import { BorrowerEntity } from './entities/borrower.entity';

export abstract class IBorrowerService extends BaseService<BorrowerEntity> {
    /** Lấy danh sách người mượn sách theo id của sách */
    abstract getAllPaginatedByBookId(bookId: string, options: FindPaginatedOptions<BorrowerEntity>): Promise<IPaginationResponse<BorrowerEntity>>;
}
