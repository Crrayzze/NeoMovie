import { Entity, Column, ManyToOne, ObjectType, JoinColumn, OneToMany } from "typeorm";

import { BaseModel } from "adapters/spi/db/models/base.model";
import { UserModel } from "./user.model";
import { PlaylistMovieModel } from "./playlistMovie.model";

@Entity({ name: "playlist" })
export class PlaylistModel extends BaseModel {
	@Column({ length: 25 })
	title: string;

	@ManyToOne((): ObjectType<UserModel> => UserModel, (user: UserModel): PlaylistModel[] => user.playlist)
	@JoinColumn({ name: "user_id" })
	user: UserModel;

	@OneToMany((): ObjectType<PlaylistMovieModel> => PlaylistMovieModel, (playlist: PlaylistMovieModel): PlaylistModel => playlist.playlist)
	movie: PlaylistMovieModel[];


}
