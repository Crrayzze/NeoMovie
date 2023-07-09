import { BaseEntity } from "domain/entities/base.entity";

export class UserEntity extends BaseEntity {
	username: string;
	password: string;
	token?: string;
	firstConnection: boolean;

	constructor() {
		super();

		this.username = undefined;
		this.password = undefined;
		this.token = undefined;
		this.firstConnection = undefined;
	}
}
