import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { BookModule } from './book/book.module';
import { UserModule } from './user/user.module';
import { BookInfoModule } from './book-info/book-info.module';
import { CategoryModule } from './category/category.module';
import { BorrowerModule } from './borrower/borrower.module';

@Module({
	imports: [UserModule, AuthModule, BookModule, BookInfoModule, CategoryModule, BorrowerModule]
})
export class ApiModule {}
