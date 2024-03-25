import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

@Module({
	imports: [
		NestConfigModule.forRoot({
			isGlobal: true,
			envFilePath: '.env',
			validationSchema: Joi.object({
				NODE_ENV: Joi.string(),
				PORT: Joi.number(),

				DB_HOST: Joi.string(),
				DB_PORT: Joi.number(),
				DB_USERNAME: Joi.string().required(),
				DB_PASSWORD: Joi.string().required().allow(''),
				DB_NAME: Joi.string().required(),
				DB_SCHEMA: Joi.string().required(),

				SECRET_JWT: Joi.string().required()
			})
		})
	]
})
export class ConfigModule {}
