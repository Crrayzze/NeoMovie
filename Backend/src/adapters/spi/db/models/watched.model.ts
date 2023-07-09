import { Entity, Column, ManyToOne, ObjectType, JoinColumn } from "typeorm";

import { BaseModel } from "adapters/spi/db/models/base.model";
import { UserModel } from "./user.model";

@Entity({ name: "watched" })
export class WatchedModel extends BaseModel {
	@Column({ length: 25 })
	movieId: string;

	@ManyToOne((): ObjectType<UserModel> => UserModel, (user: UserModel): WatchedModel[] => user.watched)
	@JoinColumn({ name: "user_id" })
	user: UserModel;

}
