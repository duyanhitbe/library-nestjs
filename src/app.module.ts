import { ApiModule } from '@apis/api.module';
import { LoggerMiddleware } from '@common';
import { ConfigModule } from '@modules/configs';
import { DatabaseModule } from '@modules/database';
import { I18NModule } from '@modules/i18n';
import { JwtModule } from '@modules/jwt';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AppController } from './app.controller';
import { providers } from './app.provider';

@Module({
	imports: [ConfigModule, DatabaseModule, JwtModule, I18NModule, CqrsModule.forRoot(), ApiModule],
	controllers: [AppController],
	providers
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(LoggerMiddleware).forRoutes('*');
	}
}
