declare global {
	type Env = 'dev' | 'staging' | 'production' | 'local';
	namespace NodeJS {
		interface ProcessEnv {
			/** App env */
			NODE_ENV: Env;
			/** App port */
			PORT: number;
			/** Database schema */
			DB_SCHEMA: string;
			/** Database host */
			DB_HOST: string;
			/** Database port */
			DB_PORT: number;
			/** Database username */
			DB_USERNAME: string;
			/** Database password */
			DB_PASSWORD: string;
			/** Database name */
			DB_NAME: string;
			/** Secret of JWT */
			SECRET_JWT: string;
		}
	}
}

export {};
