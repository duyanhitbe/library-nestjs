/*eslint prefer-rest-params: "off"*/

import { ConsoleLogger } from '@nestjs/common';

export class InternalDisabledLogger extends ConsoleLogger {
	static contextsToIgnore = ['InstanceLoader', 'RoutesResolver', 'RouterExplorer', 'NestFactory'];

	log(message: any, context: string): void {
		if (!InternalDisabledLogger.contextsToIgnore.includes(context)) {
			super.log.apply(this, [message, context]);
		}
	}
}
