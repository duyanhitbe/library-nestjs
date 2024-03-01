import { BaseService } from '@common';
import { BookInfoEntity } from './entities/book-info.entity';

export abstract class IBookInfoService extends BaseService<BookInfoEntity> {}
