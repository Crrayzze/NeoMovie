import { Entity, Column, OneToMany, ObjectType } from "typeorm";

import { BaseModel } from "adapters/spi/db/models/base.model";
import { PlaylistModel } from "./playlist.model";
import { LikeModel } from "./like.model";
import { WatchedModel } from "./watched.model";
import { UserGenreModel } from "./userGenre.model";

@Entity({ name: "user" })
export class UserModel extends BaseModel {

	@Column({ length: 16 })
	username: string;

	@Column({ length: 256 })
	password: string;

	@Column({length: 20, nullable: true})
	token?: string;

	@Column({default: true})
	firstConnection: boolean;

	@OneToMany((): ObjectType<PlaylistModel> => PlaylistModel, (playlist: PlaylistModel): UserModel => playlist.user)
	playlist: PlaylistModel[];

	@OneToMany((): ObjectType<LikeModel> => LikeModel, (like: LikeModel): UserModel => like.user)
	like: LikeModel[];

	@OneToMany((): ObjectType<WatchedModel> => WatchedModel, (watched: WatchedModel): UserModel => watched.user)
	watched: WatchedModel[];

	@OneToMany((): ObjectType<UserGenreModel> => UserGenreModel, (userGenre: UserGenreModel): UserModel => userGenre.user)
	userGenre: UserGenreModel[];

}
