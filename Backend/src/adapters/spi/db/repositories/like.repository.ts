import { EntityManager } from "typeorm";

import { DbMapper } from "application/mappers/db.mapper";

import { GenericError } from "domain/errors/generic.error.entity";
import { AbstractLikeRepository } from "application/repositories/like.repository.abstract";
import { LikeModel } from "../models/like.model";
import { LikeMapper } from "../mappers/like.mapper";
import { LikeEntity } from "domain/entities/like.entity";
import { UserModel } from "../models/user.model";

export class LikeRepository implements AbstractLikeRepository {
	private entityManager: EntityManager;
	private mapper: DbMapper<LikeEntity, LikeModel>;

	constructor(entityManager: EntityManager) {
		this.entityManager = entityManager;
		this.mapper = new LikeMapper();
	}

	async create(entity: LikeEntity): Promise<void> {
		try {
			await this.entityManager.save(this.mapper.toModel(entity));
		} catch (e) {
			throw new GenericError("Movie cannot be liked");
		}
	}

	async get(user: UserModel): Promise<LikeEntity[]> {
		try {
			const datas: LikeModel[] = await this.entityManager.getRepository(LikeModel).find({ user });

			const entities: LikeEntity[] = [];
			for (const data of datas) {
				entities.push(this.mapper.toEntity(data));
			}
			return entities;		
		} catch {
			throw new GenericError("Like cannot be fetched by id");
		}
	}

	async getByUserMovie(user: UserModel, like: LikeEntity): Promise<boolean> {
		try {
			const data: LikeModel = await this.entityManager.getRepository(LikeModel).findOne({ user, movieId: like.movieId });
			if (data) {
				return true;
			}
			return false;		
		} catch {
			throw new GenericError("liked movie cannot be fetched by user id and movie Id");
		}
	}

}
