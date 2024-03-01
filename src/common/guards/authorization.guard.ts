import { RoleEnum } from '@app/apis/user/user.enum';
import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { MetadataKey } from '../constants';

@Injectable()
export class AuthorizationGuard implements CanActivate {
	constructor(private reflector: Reflector) {}

	canActivate(context: ExecutionContext): boolean {
		const requiredRoles = this.reflector.getAllAndOverride<RoleEnum[]>(MetadataKey.ROLES_KEY, [
			context.getHandler(),
			context.getClass()
		]);
		if (!requiredRoles) {
			return true;
		}
		const user = context.switchToHttp().getRequest<Request>().user as User;
		if (!requiredRoles.includes(user.role)) {
			throw new ForbiddenException('Không đủ quyền truy cập');
		}
		return true;
	}
}
