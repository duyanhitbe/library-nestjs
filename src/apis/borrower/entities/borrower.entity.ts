import { BaseEntity } from '@common';
import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'borrowers' })
export class BorrowerEntity extends BaseEntity {
	/** Tên người mượn sách */
	@ApiProperty({ description: 'Tên người mượn sách' })
	@Column()
	name!: string;

	/** Số điện thoại người mượn sách */
	@ApiProperty({ description: 'Số điện thoại người mượn sách' })
	@Column()
	phone!: string;

	/** Địa chỉ người mượn sách */
	@ApiProperty({ description: 'Địa chỉ người mượn sách' })
	@Column()
	address!: string;
}
