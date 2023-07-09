import { Entity, Column, ManyToOne, ObjectType, JoinColumn } from "typeorm";

import { BaseModel } from "adapters/spi/db/models/base.model";
import { PlaylistModel } from "./playlist.model";

@Entity({ name: "playlistMovie" })
export class PlaylistMovieModel extends BaseModel {
	@Column({ length: 25 })
	movieId: string;

	@ManyToOne((): ObjectType<PlaylistModel> => PlaylistModel, (user: PlaylistModel): PlaylistMovieModel[] => user.movie)
	@JoinColumn({ name: "playlist_id" })
	playlist: PlaylistModel;

}
