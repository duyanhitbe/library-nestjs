import { applyDecorators } from '@nestjs/common';
import {
	ApiBadRequestResponse,
	ApiConflictResponse,
	ApiCreatedResponse,
	ApiExcludeController,
	ApiHeader,
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiOperation,
	ApiTags,
	getSchemaPath
} from '@nestjs/swagger';
import { ReferenceObject, SchemaObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import { Language } from '@app/common';

export const getBaseProperties = (
	status: number
): Record<string, SchemaObject | ReferenceObject> => {
	return {
		status: { example: status },
		message: { example: 'success' }
	};
};

export const getPaginationProperties = (): Record<string, SchemaObject | ReferenceObject> => {
	return {
		pagination: {
			properties: {
				limit: { example: 10 },
				page: { example: 1 },
				total: { example: 10 }
			}
		}
	};
};

export const getBaseSchema = ($ref: any, status = 200): SchemaObject & Partial<ReferenceObject> => {
	return {
		properties: {
			...getBaseProperties(status),
			data: { $ref: getSchemaPath($ref) }
		}
	};
};

export const getBaseException = (
	message: string,
	status: number
): SchemaObject & Partial<ReferenceObject> => {
	if (status === 400) {
		return {
			properties: {
				...getBaseProperties(status),
				message: { example: message },
				errors: {
					type: 'array',
					items: {
						properties: {
							property: { example: 'string' },
							error: { example: 'string' }
						}
					}
				}
			}
		};
	}

	return {
		properties: {
			...getBaseProperties(status),
			message: { example: message },
			errors: { example: [] }
		}
	};
};

export const getPaginationSchema = (
	$ref: any,
	status = 200
): SchemaObject & Partial<ReferenceObject> => {
	return {
		properties: {
			...getBaseProperties(status),
			data: {
				type: 'array',
				items: {
					$ref: getSchemaPath($ref)
				}
			},
			...getPaginationProperties()
		}
	};
};

/**
 * Swagger creation API
 * @param $ref Class Schema
 * @param name Schema name
 * @example ApiCreate(User, 'user')
 */
export const ApiCreate = ($ref: any, name: string) =>
	applyDecorators(
		ApiOperation({ summary: 'Create a new ' + name }),
		ApiCreatedResponse({
			description: 'Create a new ' + name + ' successfully',
			schema: getBaseSchema($ref, 201)
		}),
		ApiBadRequestResponse({
			schema: getBaseException('BadRequest', 400),
			description: 'Wrong or missing data'
		}),
		ApiConflictResponse({
			schema: getBaseException('Conflict', 409),
			description: 'Data was duplicated'
		})
	);

/**
 * Swagger get list API
 * @param $ref Class Schema
 * @param name Schema name
 * @example ApiGetAll(User, 'user')
 */
export const ApiGetAll = ($ref: any, name: string) =>
	applyDecorators(
		ApiOperation({ summary: 'Get a list of ' + name }),
		ApiOkResponse({
			description: 'Get a list of ' + name + ' successfully',
			schema: getPaginationSchema($ref)
		})
	);

/**
 * Swagger get detail API
 * @param $ref Class Schema
 * @param name Schema name
 * @example ApiGetOne(User, 'user')
 */
export const ApiGetOne = ($ref: any, name: string) =>
	applyDecorators(
		ApiOperation({ summary: 'Get detail a ' + name }),
		ApiOkResponse({
			description: 'Get detail a ' + name + ' successfully',
			schema: getBaseSchema($ref)
		}),
		ApiNotFoundResponse({
			schema: getBaseException('NotFound', 404),
			description: name + ' not found'
		})
	);

/**
 * Swagger update API
 * @param $ref Class Schema
 * @param name Schema name
 * @example ApiUpdate(User, 'user')
 */
export const ApiUpdate = ($ref: any, name: string) =>
	applyDecorators(
		ApiOperation({ summary: 'Update a ' + name }),
		ApiOkResponse({
			description: 'Update a ' + name + ' successfully',
			schema: getBaseSchema($ref)
		}),
		ApiBadRequestResponse({
			schema: getBaseException('BadRequest', 400),
			description: 'Wrong or missing data'
		}),
		ApiNotFoundResponse({
			schema: getBaseException('NotFound', 404),
			description: name + ' not found'
		})
	);

/**
 * Swagger deletion API
 * @param $ref Class Schema
 * @param name Schema name
 * @example ApiDelete(User, 'user')
 */
export const ApiDelete = ($ref: any, name: string) =>
	applyDecorators(
		ApiOperation({ summary: 'Delete a ' + name }),
		ApiOkResponse({
			description: 'Delete a ' + name + ' successfully',
			schema: getBaseSchema($ref)
		}),
		ApiNotFoundResponse({
			schema: getBaseException('NotFound', 404),
			description: name + ' not found'
		})
	);

/**
 * Swagger language
 * @example ApiLanguage()
 */
export const ApiLanguage = () =>
	applyDecorators(
		ApiHeader({
			name: 'x-lang',
			description: 'Language',
			enum: Language,
			required: false
		})
	);

/**
 * Swagger hide controller on production
 * @example ApiHideController()
 */
export const ApiHideController = () =>
	applyDecorators(ApiExcludeController(process.env.NODE_ENV === 'production'));

/**
 * Short-hand swagger decorators for controller
 * @example ApiController()
 */
export const ApiController = (name: string) =>
	applyDecorators(ApiHideController(), ApiLanguage(), ApiTags(`${name} API`));
