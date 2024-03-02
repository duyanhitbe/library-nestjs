import { ICategoryService } from '@apis/category/category.interface';
import { CreateCategoryDto } from '@apis/category/dto/create-category.dto';
import { UpdateCategoryByIdDto } from '@apis/category/dto/update-category-by-id.dto';
import { CategoryEntity } from '@apis/category/entities/category.entity';
import { random } from '@app/common';
import { INestApplication, VersioningType } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import * as request from 'supertest';

describe('CategoryController (e2e)', () => {
	let app: INestApplication;
	let httpServer: any;
	let categoryService: ICategoryService;
	let category: CategoryEntity;

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

		//Remove all category
		categoryService = app.get<ICategoryService>(ICategoryService);
		await categoryService.softRemoveAll();
		category = await categoryService.create({
			name: 'name'
		});
	});

	afterAll(async () => {
		await categoryService.softRemoveAll();
		await app.close();
	});

	it('/v1/category (GET)', async () => {
		await categoryService.create({
			name: 'category'
		});
		return request(httpServer)
			.get('/v1/category')
			.query({ limit: 1, page: 1, order: JSON.stringify({ createdAt: 'asc' }) })
			.expect(200)
			.then(({ body }) => {
				expect(body.status).toEqual(200);
				expect(body.message).toEqual('success');
				expect(body.data?.length).toEqual(1);
				expect(body.data?.[0].id).toEqual(category.id);
				expect(body.pagination.limit).toEqual(1);
				expect(body.pagination.page).toEqual(1);
				expect(body.pagination.total).toEqual(2);
			});
	});
	it('/v1/category/:id (GET)', async () => {
		return request(httpServer)
			.get(`/v1/category/${category.id}`)
			.expect(200)
			.then(({ body }) => {
				expect(body.status).toEqual(200);
				expect(body.message).toEqual('success');
				expect(body.data.id).toEqual(category.id);
			});
	});
	it('/v1/category (POST)', () => {
		const createCategoryData: CreateCategoryDto = {
			name: 'category'
		};
		return request(httpServer)
			.post('/v1/category')
			.send(createCategoryData)
			.expect(201)
			.then(({ body }) => {
				expect(body.status).toEqual(201);
				expect(body.message).toEqual('success');
			});
	});
	it('/v1/category/:id (PATCH)', async () => {
		const updateCategoryData: UpdateCategoryByIdDto = {
			name: 'updatedCategory'
		};
		return request(httpServer)
			.patch(`/v1/category/${category.id}`)
			.send(updateCategoryData)
			.expect(200)
			.then(({ body }) => {
				expect(body.status).toEqual(200);
				expect(body.message).toEqual('success');
				expect(body.data.id).toEqual(category.id);
			});
	});
	it('/v1/category/:id (DELETE)', async () => {
		return request(httpServer)
			.patch(`/v1/category/${category.id}`)
			.expect(200)
			.then(({ body }) => {
				expect(body.status).toEqual(200);
				expect(body.message).toEqual('success');
				expect(body.data.id).toEqual(category.id);
			});
	});
});

export async function createRandomCategory() {
	return CategoryEntity.create({ name: random(10) });
}
