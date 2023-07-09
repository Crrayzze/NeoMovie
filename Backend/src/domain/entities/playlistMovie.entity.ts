import { BaseEntity } from "domain/entities/base.entity";
import { PlaylistEntity } from "./playlist.entities";

export class PlaylistMovieEntity extends BaseEntity {
	movieId: string;
	playlist: PlaylistEntity;

	constructor() {
		super();

		this.movieId = undefined;
		this.playlist = undefined;
	}
}
