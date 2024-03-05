import { BaseService } from '@common';
import { BookEntity } from './entities/book.entity';

export abstract class IBookService extends BaseService<BookEntity> {
    /** Lấy danh sách sách theo id của người mượn sách */
    abstract getAllPaginatedByBorrowerId(borrowerId: string, options: FindPaginatedOptions<BookEntity>): Promise<IPaginationResponse<BookEntity>>;
}
