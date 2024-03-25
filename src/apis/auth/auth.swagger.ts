import { getBaseProperties } from '@common';
import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, getSchemaPath } from '@nestjs/swagger';
import { LoginUserResponseDto } from './dto/login-user.dto';

/**
 * Swagger login
 * @param userType User type
 * @example ApiLogin('user')
 */
export const ApiLogin = (userType: UserType) =>
	applyDecorators(
		ApiOperation({ summary: `Login ${userType}` }),
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
