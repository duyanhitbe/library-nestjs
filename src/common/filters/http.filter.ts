import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpFilter implements ExceptionFilter {
	catch(exception: HttpException, host: ArgumentsHost) {
		const response = host.switchToHttp().getResponse<Response>();
		const status = exception.getStatus();
		if (status !== 400) {
			const { message } = exception.getResponse() as any;
			return response.status(status).json({
				status,
				message,
				errors: []
			});
		}
	}
}
