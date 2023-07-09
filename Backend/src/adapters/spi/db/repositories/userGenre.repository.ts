import { EntityManager } from "typeorm";

import { DbMapper } from "application/mappers/db.mapper";

import { GenericError } from "domain/errors/generic.error.entity";
import { AbstractUserGenreRepository } from "application/repositories/userGenre.repository.abstract";
import { UserGenreEntity } from "domain/entities/userGenre.entity";
import { UserGenreMapper } from "../mappers/userGenre.mapper";
import { UserGenreModel } from "../models/userGenre.model";
import { UserModel } from "../models/user.model";

export class UserGenreRepository implements AbstractUserGenreRepository {
	private entityManager: EntityManager;
	private mapper: DbMapper<UserGenreEntity, UserGenreModel>;

	constructor(entityManager: EntityManager) {
		this.entityManager = entityManager;
		this.mapper = new UserGenreMapper();
	}

	async create(entity: UserGenreEntity): Promise<void> {
		try {
			await this.entityManager.save(this.mapper.toModel(entity));
		} catch (e) {
			throw new GenericError("Relation User genre cannot be created");
		}
	}

	async getByUserId(userModel: UserModel): Promise<string[]> {
		try {
			const datas: UserGenreModel[] = await this.entityManager.getRepository(UserGenreModel).find({user: userModel});

			const toReturn: string[] = [];
			for (const data of datas) {
				toReturn.push(data.genreId);
			}
			return toReturn;
		} catch (e) {
			throw new GenericError("Cannot fetch user's fav genre");
		}
	}

}
