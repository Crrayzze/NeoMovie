import { EntityManager } from "typeorm";

import { DbMapper } from "application/mappers/db.mapper";

import { GenericError } from "domain/errors/generic.error.entity";
import { AbstractPlaylistRepository } from "application/repositories/playlist.repository.abstract";
import { PlaylistModel } from "../models/playlist.model";
import { PaylistMapper } from "../mappers/playlist.mapper";
import { PlaylistEntity } from "domain/entities/playlist.entities";
import { UserModel } from "../models/user.model";

export class PlaylistRepository implements AbstractPlaylistRepository {
	private entityManager: EntityManager;
	private mapper: DbMapper<PlaylistEntity, PlaylistModel>;

	constructor(entityManager: EntityManager) {
		this.entityManager = entityManager;
		this.mapper = new PaylistMapper();
	}

	async create(playlist: PlaylistEntity): Promise<void> {
		try {
			await this.entityManager.save(this.mapper.toModel(playlist));
		} catch (e) {
			throw new GenericError("Playlist cannot be created");
		}
	}

	async getById(id: string): Promise<PlaylistEntity> {
		try {
			const data: PlaylistModel = await this.entityManager.getRepository(PlaylistModel).findOneOrFail({ id });
			return this.mapper.toEntity(data);
		} catch (e) {
			throw new GenericError("Playlist cannot be fetched");
		}
	}

	async getAll(user: UserModel): Promise<PlaylistEntity[]> {
		try {
			const datas: PlaylistModel[] = await this.entityManager.getRepository(PlaylistModel).find({ user });

			const entities: PlaylistEntity[] = [];
			for (const data of datas) {
				entities.push(this.mapper.toEntity(data));
			}
			return entities;
		} catch (e) {
			throw new GenericError("Playlist cannot be fetched");
		}
	}



}
