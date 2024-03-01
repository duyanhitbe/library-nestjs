import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IBookInfoService } from './book-info.interface';
import { BookInfoService } from './book-info.service';
import { BookInfoEntity } from './entities/book-info.entity';

@Module({
	imports: [TypeOrmModule.forFeature([BookInfoEntity])],
	providers: [
		{
			provide: IBookInfoService,
			useClass: BookInfoService
		}
	],
	exports: [IBookInfoService]
})
export class BookInfoModule {}
