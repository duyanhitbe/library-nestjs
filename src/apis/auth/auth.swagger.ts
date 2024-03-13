import { getBaseProperties } from '@common';
import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, getSchemaPath } from '@nestjs/swagger';
import { LoginUserResponseDto } from './dto/login-user.dto';

/**
 * Swagger login
 * @param userType Loại người dùng
 * @example ApiLogin('user')
 */
export const ApiLogin = (userType: UserType) =>
	applyDecorators(
		ApiOperation({ summary: `Đăng nhập ${userType}` }),
		ApiOkResponse({
			schema: {
				properties: {
					...getBaseProperties(200),
					data: {
						$ref: getSchemaPath(LoginUserResponseDto)
					}
				}
			}
		})
	);
