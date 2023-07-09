import { Entity, Column, ManyToOne, ObjectType, JoinColumn } from "typeorm";

import { BaseModel } from "adapters/spi/db/models/base.model";
import { UserModel } from "./user.model";

@Entity({ name: "like" })
export class LikeModel extends BaseModel {
	@Column({ length: 25 })
	movieId: string;

	@ManyToOne((): ObjectType<UserModel> => UserModel, (user: UserModel): LikeModel[] => user.like)
	@JoinColumn({ name: "user_id" })
	user: UserModel;

}
