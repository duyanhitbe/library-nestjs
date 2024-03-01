import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BorrowerController } from './borrower.controller';
import { IBorrowerService } from './borrower.interface';
import { BorrowerService } from './borrower.service';
import { BorrowerEntity } from './entities/borrower.entity';

@Module({
	imports: [TypeOrmModule.forFeature([BorrowerEntity])],
	controllers: [BorrowerController],
	providers: [
		{
			provide: IBorrowerService,
			useClass: BorrowerService
		}
	],
	exports: [IBorrowerService]
})
export class BorrowerModule {}
