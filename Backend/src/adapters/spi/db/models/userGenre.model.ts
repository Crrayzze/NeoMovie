import { Entity, Column, ManyToOne, ObjectType, JoinColumn } from "typeorm";

import { BaseModel } from "adapters/spi/db/models/base.model";
import { UserModel } from "./user.model";

@Entity({ name: "userGenre" })
export class UserGenreModel extends BaseModel {
	@Column({ length: 25 })
	genreId: string;

	@Column({ length: 25 })
	name: string;

	@ManyToOne((): ObjectType<UserModel> => UserModel, (user: UserModel): UserGenreModel[] => user.userGenre)
	@JoinColumn({ name: "user_id" })
	user: UserModel;

}
