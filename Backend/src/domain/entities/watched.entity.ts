import { BaseEntity } from "domain/entities/base.entity";
import { UserEntity } from "./user.entity";

export class WatchedEntity extends BaseEntity {
	user: UserEntity;
	movieId: string;

	constructor() {
		super();

		this.user = undefined;
		this.movieId = undefined;
	}
}
