import { IBookService } from '@apis/book/book.interface';
import { CreateBookDto } from '@apis/book/dto/create-book.dto';
import { UpdateBookByIdDto } from '@apis/book/dto/update-book-by-id.dto';
import { BookInfoEntity } from '@app/apis/book-info/entities/book-info.entity';
import { BookEntity } from '@app/apis/book/entities/book.entity';
import { AppModule } from '@app/app.module';
import { random } from '@app/common';
import { INestApplication, VersioningType } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { createRandomCategory } from './category.e2e-spec';

describe('BookController (e2e)', () => {
	let app: INestApplication;
	let httpServer: any;
	let bookService: IBookService;
	let book: BookEntity;

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule]
		}).compile();

		app = moduleFixture.createNestApplication();
		httpServer = app.getHttpServer();
		app.enableCors({
			origin: true,
			credentials: true
		});
		app.enableVersioning({
			type: VersioningType.URI,
			defaultVersion: '1'
		});
		await app.init();

		//Remove all book
		bookService = app.get<IBookService>(IBookService);
		await bookService.softRemoveAll();
		book = await createRandomBook();
	});

	afterAll(async () => {
		await bookService.softRemoveAll();
		await app.close();
	});

	it('/v1/book (GET)', async () => {
		await createRandomBook();
		return request(httpServer)
			.get('/v1/book')
			.query({ limit: 1, page: 1, order: JSON.stringify({ createdAt: 'asc' }) })
			.expect(200)
			.then(({ body }) => {
				expect(body.status).toEqual(200);
				expect(body.message).toEqual('success');
				expect(body.data?.length).toEqual(1);
				expect(body.data?.[0].id).toEqual(book.id);
				expect(body.pagination.limit).toEqual(1);
				expect(body.pagination.page).toEqual(1);
				expect(body.pagination.total).toEqual(2);
			});
	});
	it('/v1/book/:id (GET)', async () => {
		return request(httpServer)
			.get(`/v1/book/${book.id}`)
			.expect(200)
			.then(({ body }) => {
				expect(body.status).toEqual(200);
				expect(body.message).toEqual('success');
				expect(body.data.id).toEqual(book.id);
			});
	});
	it('/v1/book (POST)', async () => {
		const category = await createRandomCategory();
		const createBookData: CreateBookDto = {
			name: random(20),
			author: random(10),
			publicationDate: new Date().toISOString(),
			categoryId: category.id
		};
		return request(httpServer)
			.post('/v1/book')
			.send(createBookData)
			.expect(201)
			.then(({ body }) => {
				expect(body.status).toEqual(201);
				expect(body.message).toEqual('success');
			});
	});
	it('/v1/book/:id (PATCH)', async () => {
		const updateBookData: UpdateBookByIdDto = {};
		return request(httpServer)
			.patch(`/v1/book/${book.id}`)
			.send(updateBookData)
			.expect(200)
			.then(({ body }) => {
				expect(body.status).toEqual(200);
				expect(body.message).toEqual('success');
				expect(body.data.id).toEqual(book.id);
			});
	});
	it('/v1/book/:id (DELETE)', async () => {
		return request(httpServer)
			.patch(`/v1/book/${book.id}`)
			.expect(200)
			.then(({ body }) => {
				expect(body.status).toEqual(200);
				expect(body.message).toEqual('success');
				expect(body.data.id).toEqual(book.id);
			});
	});
});

export async function createRandomBook() {
	const category = await createRandomCategory();
	const bookInfo = await BookInfoEntity.create({
		name: random(20),
		author: random(10),
		publicationDate: new Date()
	});
	return BookEntity.create({ categoryId: category.id, bookInfoId: bookInfo.id });
}
