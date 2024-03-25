import { BaseEntity } from '@common';
import { FindOptionsOrder, FindOptionsSelect, FindOptionsWhere } from 'typeorm';

declare global {
	type FindOptions<T extends BaseEntity> = {
		/** Query condition */
		where?: FindOptionsWhere<T> | FindOptionsWhere<T>[];
		/** Order method */
		order?: FindOptionsOrder<T>;
		/** Join table */
		relations?: string[];
		/** Eager activation */
		loadEagerRelations?: boolean;
		/** Get data with deleted */
		withDeleted?: boolean;
		/** Select field should be attached */
		select?: FindOptionsSelect<T>;
	};

	type FindOrFailOptions<T extends BaseEntity> = FindOptions<T> & {
		/** Error message when record not found */
		errorMessage?: string;
	};

	type FindPaginatedOptions<T extends BaseEntity> = Partial<FindOptions<T>> & {
		/** Number of item per page */
		limit?: number;
		/** Current page */
		page?: number;
		/**
		 * Extend filter
		 * @examples { "name": "ABC" }
		 */
		filter?: FindOptionsWhere<T> | FindOptionsWhere<T>[];
	};

	type IPaginationResponse<T> = {
		/** A list of data */
		data: T[];
		pagination: {
			/** Number of item per page */
			limit: number;
			/** Current page */
			page: number;
			/** Total record without limitation */
			total: number;
		};
	};

	type IResponse<T> = {
		/** Response status code */
		status: number;
		/** Response message */
		message: string;
		/** Response data */
		data: T;
		/** Response pagination */
		pagination?: {
			/** Number of item per page */
			limit: number;
			/** Current page */
			page: number;
			/** Total record without limitation */
			total: number;
		};
	};

	type GenerateTokenData = {
		accessToken: string;
	};

	type LogoutData = {
		success: boolean;
	};
}

export {};
