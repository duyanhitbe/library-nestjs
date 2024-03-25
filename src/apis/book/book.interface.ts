import { BaseService } from '@common';
import { BookEntity } from './entities/book.entity';

export abstract class IBookService extends BaseService<BookEntity> {
    /** Get list of books by borrower id (with pagination) */
    abstract getAllPaginatedByBorrowerId(borrowerId: string, options: FindPaginatedOptions<BookEntity>): Promise<IPaginationResponse<BookEntity>>;
}
