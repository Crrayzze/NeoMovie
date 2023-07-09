import { ApiMapper } from "application/mappers/api.mapper";
import { EntirePlaylistMovieEntity } from "domain/entities/entirePlaylist.entity";
import { PlaylistPresenter } from "../presenters/playlist.presenter";
import { BasePayloadEntity } from "domain/payloads/base.payload.entity";
import { MovieApiMapper } from "./movie.mapper";

export class PlaylistApiMapper implements ApiMapper<EntirePlaylistMovieEntity, PlaylistPresenter, BasePayloadEntity> {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	toEntity(payload: BasePayloadEntity): EntirePlaylistMovieEntity {
		throw new Error("not implemented");
	}

	toApi(entity: EntirePlaylistMovieEntity): PlaylistPresenter {
		const presenter: PlaylistPresenter = {
			id: entity.id,
			title: entity.title,
			movie: []
		};

		const movieApiMapper: MovieApiMapper = new MovieApiMapper();

		for (const movie of entity.movieEntities) {
			presenter.movie.push(movieApiMapper.toApi(movie));
		}

		return presenter;
	}
}
