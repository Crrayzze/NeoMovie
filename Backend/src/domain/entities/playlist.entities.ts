import { BaseEntity } from "domain/entities/base.entity";
import { UserEntity } from "./user.entity";

export class PlaylistEntity extends BaseEntity {
	title: string;
	user: UserEntity;

	constructor() {
		super();

		this.title = undefined;
		this.user = undefined;
	}
}
