import { EntityManager } from "typeorm";

import { DbMapper } from "application/mappers/db.mapper";

import { GenericError } from "domain/errors/generic.error.entity";
import { AbstractPlaylistMovieRepository } from "application/repositories/playlistMovie.repository.abstract";
import { PlaylistMovieModel } from "../models/playlistMovie.model";
import { PaylistMovieMapper } from "../mappers/playlistMovie.mapper";
import { PlaylistMovieEntity } from "domain/entities/playlistMovie.entity";
import { PlaylistModel } from "../models/playlist.model";

export class PlaylistMovieRepository implements AbstractPlaylistMovieRepository {
	private entityManager: EntityManager;
	private mapper: DbMapper<PlaylistMovieEntity, PlaylistMovieModel>;

	constructor(entityManager: EntityManager) {
		this.entityManager = entityManager;
		this.mapper = new PaylistMovieMapper();
	}

	async create(playlist: PlaylistMovieEntity): Promise<void> {
		try {
			await this.entityManager.save(this.mapper.toModel(playlist));
		} catch (e) {
			throw new GenericError("Movie cannot be added to playlist");
		}
	}

	async delete(id: string): Promise<void> {
		try {
			await this.entityManager.getRepository(PlaylistMovieModel).delete({ id });
		} catch (e) {
			throw new GenericError("Movie cannot be deleted from the playlist");
		}
	}

	async getByPlaylistId(playlist: PlaylistModel): Promise<PlaylistMovieEntity[]> {
		try {
			const datas: PlaylistMovieModel[] = await this.entityManager.getRepository(PlaylistMovieModel).find({ playlist });

			const entities: PlaylistMovieEntity[] = [];
			for (const data of datas) {
				entities.push(this.mapper.toEntity(data));
			}
			return entities;
		} catch {
			throw new GenericError("Movie cannot be fetched by id");
		}
		
	}

	async getByPlaylistMovie(playlist: PlaylistModel, newMovie: PlaylistMovieEntity): Promise<boolean> {
		try {
			const data: PlaylistMovieModel = await this.entityManager.getRepository(PlaylistMovieModel).findOne({ playlist, movieId: newMovie.movieId });
			if (data) {
				return true;
			}
			return false;		
		} catch {
			throw new GenericError("PlaylistMovie movie cannot be fetched by playlist id and movie Id");
		}
	}

}
