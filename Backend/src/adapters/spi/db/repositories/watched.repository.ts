import { EntityManager } from "typeorm";

import { DbMapper } from "application/mappers/db.mapper";

import { GenericError } from "domain/errors/generic.error.entity";
import { AbstractWatchedRepository } from "application/repositories/watched.repository.abstract";
import { WatchedModel } from "../models/watched.model";
import { WatchedMapper } from "../mappers/watched.mapper";
import { WatchedEntity } from "domain/entities/watched.entity";
import { UserModel } from "../models/user.model";

export class WatchedRepository implements AbstractWatchedRepository {
	private entityManager: EntityManager;
	private mapper: DbMapper<WatchedEntity, WatchedModel>;

	constructor(entityManager: EntityManager) {
		this.entityManager = entityManager;
		this.mapper = new WatchedMapper();
	}

	async create(entity: WatchedEntity): Promise<void> {
		try {
			await this.entityManager.save(this.mapper.toModel(entity));
		} catch (e) {
			throw new GenericError("Movie cannot be liked");
		}
	}

	async get(user: UserModel): Promise<WatchedEntity[]> {
		try {
			const datas: WatchedModel[] = await this.entityManager.getRepository(WatchedModel).find({ user });

			const entities: WatchedEntity[] = [];
			for (const data of datas) {
				entities.push(this.mapper.toEntity(data));
			}
			return entities;		
		} catch {
			throw new GenericError("Watched movie cannot be fetched by id");
		}
	}

	async getByUserMovie(user: UserModel, watched: WatchedEntity): Promise<boolean> {
		try {
			const data: WatchedModel = await this.entityManager.getRepository(WatchedModel).findOne({ user, movieId: watched.movieId });
			if (data) {
				return true;
			}
			return false;		
		} catch {
			throw new GenericError("Watched movie cannot be fetched by user id and movie Id");
		}
	}


}
