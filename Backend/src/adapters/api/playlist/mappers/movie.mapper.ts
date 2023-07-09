import { ApiMapper } from "application/mappers/api.mapper";
import { MovieEntity } from "domain/entities/movie.entity";
import { BasePayloadEntity } from "domain/payloads/base.payload.entity";
import { MoviePresenter } from "../presenters/movie.presenter";

export class MovieApiMapper implements ApiMapper<MovieEntity, MoviePresenter, BasePayloadEntity> {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	toEntity(payload: BasePayloadEntity): MovieEntity {
		throw new Error("not implemented");
	}

	toApi(entity: MovieEntity): MoviePresenter {
		const presenter: MoviePresenter = {
			id: entity.id,
			overview: entity.overview,
			poster_path: entity.posterPath,
			title: entity.title,
			vote_average: entity.voteAverage,
			backdrop_path: entity.backdropPath,
			release_date: entity.releaseDate,
			video: entity.video
		};

		return presenter;
	}
}
