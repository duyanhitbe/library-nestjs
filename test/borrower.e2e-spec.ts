import { IBorrowerService } from '@apis/borrower/borrower.interface';
import { BorrowerEntity } from '@apis/borrower/entities/borrower.entity';
import { INestApplication, VersioningType } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from 'src/app.module';

describe('BorrowerController (e2e)', () => {
	let app: INestApplication;
	let httpServer: any;
	let borrowerService: IBorrowerService;
	let borrower: BorrowerEntity;

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

		//Remove all borrower
		borrowerService = app.get<IBorrowerService>(IBorrowerService);
		await borrowerService.softRemoveAll();
		borrower = await borrowerService.create({
			name: 'name'
		});
	});

	afterAll(async () => {
		await borrowerService.softRemoveAll();
		await app.close();
	});
});
