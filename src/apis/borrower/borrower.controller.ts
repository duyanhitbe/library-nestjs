import { ApiController } from '@common';
import { Controller } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

@Controller('borrower')
@ApiController('Borrower')
export class BorrowerController {
	constructor(private readonly commandBus: CommandBus) {}
}
