import { BaseService } from '@common';
import { BorrowerEntity } from './entities/borrower.entity';

export abstract class IBorrowerService extends BaseService<BorrowerEntity> {}
