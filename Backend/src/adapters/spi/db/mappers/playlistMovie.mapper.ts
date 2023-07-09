import { PlaylistMovieModel } from "../models/playlistMovie.model";

import { DbMapper } from "application/mappers/db.mapper";
import { PaylistMapper } from "./playlist.mapper";

import { PlaylistMovieEntity } from "domain/entities/playlistMovie.entity";

export class PaylistMovieMapper implements DbMapper<PlaylistMovieEntity, PlaylistMovieModel> {
	toEntity(model: PlaylistMovieModel): PlaylistMovieEntity {
		const entity: PlaylistMovieEntity = {
			id: model.id,
			movieId: model.movieId,
			playlist: undefined
		};

		if (model.playlist) {
			const playlistMapper: PaylistMapper = new PaylistMapper();
			entity.playlist = playlistMapper.toEntity(model.playlist);
		}

		return entity;
	}

	toModel(entity: PlaylistMovieEntity): PlaylistMovieModel {
		const model: PlaylistMovieModel = new PlaylistMovieModel();

		model.createDate = new Date();
		model.updateDate = new Date();
		model.id = entity.id;
		model.movieId = entity.movieId;

		if (entity.playlist) {
			const playlistMapper: PaylistMapper = new PaylistMapper();
			model.playlist = playlistMapper.toModel(entity.playlist);
		}

		return model;
	}
}
