import { AuthStrategy } from '@apis/auth/auth.const';
import { RoleEnum } from '@app/apis/user/user.enum';
import { SetMetadata, UseGuards, applyDecorators } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { getBaseException } from '../base/base.swagger';
import { MetadataKey } from '../constants';
import { AuthorizationGuard } from '../guards/authorization.guard';

export const UseUserGuard = (...roles: RoleEnum[]) =>
	applyDecorators(
		SetMetadata(MetadataKey.ROLES_KEY, roles),
		UseGuards(AuthGuard(AuthStrategy.USER_JWT), AuthorizationGuard),
		ApiBearerAuth(),
		ApiUnauthorizedResponse({
			schema: getBaseException('Unauthorized', 401),
			description: 'Thiếu hoặc sai token'
		})
	);
