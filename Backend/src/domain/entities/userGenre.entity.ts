import { BaseEntity } from "domain/entities/base.entity";
import { UserEntity } from "./user.entity";

export class UserGenreEntity extends BaseEntity {
	genreId: string;
	name: string;
	user: UserEntity;

	constructor() {
		super();

		this.genreId = undefined;
		this.name = undefined;
		this.user = undefined;
	}
}
