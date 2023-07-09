import { BaseEntity } from "domain/entities/base.entity";
import { MovieEntity } from "./movie.entity";

export class EntirePlaylistMovieEntity extends BaseEntity {
	title: string;
	movieEntities: MovieEntity[];

	constructor() {
		super();

		this.title = undefined;
		this.movieEntities = [];
	}
}
