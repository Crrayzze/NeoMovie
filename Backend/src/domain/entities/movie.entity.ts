import { BaseEntity } from "domain/entities/base.entity";

export class MovieEntity extends BaseEntity {
	id: string;
	title: string;
	overview: string;
	posterPath: string;
	voteAverage: string;
	backdropPath: string;
	releaseDate: string;
	video: boolean;


	constructor() {
		super();

		this.id = undefined;
		this.title = undefined;
		this.overview = undefined;
		this.posterPath = undefined;
		this.voteAverage = undefined;
		this.backdropPath = undefined;
		this.releaseDate = undefined;
		this.video = undefined;
	}
}
