import { BookEntity } from '@apis/book/entities/book.entity';
import { UserEntity } from '@apis/user/entities/user.entity';
import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as packageJson from 'packageJson';
import { BookInfoEntity } from './apis/book-info/entities/book-info.entity';
import { BorrowBookResponse } from './apis/book/dto/borrow-book.dto';
import { BorrowerEntity } from './apis/borrower/entities/borrower.entity';
import { CategoryEntity } from './apis/category/entities/category.entity';

export function useSwagger(app: INestApplication) {
	const path = 'docs';
	const title = 'Library App';
	const version = packageJson.version;
	const description = packageJson.description;

	const config = new DocumentBuilder()
		.setTitle(title)
		.setDescription(description)
		.setVersion(version)
		.addBearerAuth()
		.build();
	const document = SwaggerModule.createDocument(app, config, {
		extraModels
	});
	SwaggerModule.setup(path, app, document, {
		swaggerOptions: {
			persistAuthorization: true,
			tagsSorter: 'alpha',
			operationsSorter: (a, b) => {
				const methodsOrder = ['get', 'post', 'put', 'patch', 'delete', 'options', 'trace'];
				let result =
					methodsOrder.indexOf(a.get('method')) - methodsOrder.indexOf(b.get('method'));

				if (result === 0) {
					result = a.get('path').localeCompare(b.get('path'));
				}

				return result;
			}
		}
	});
}

const extraModels = [
	BookEntity,
	BookInfoEntity,
	BorrowerEntity,
	CategoryEntity,
	UserEntity,
	BorrowBookResponse
];
