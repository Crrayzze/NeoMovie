import { UserGenreModel } from "../models/userGenre.model";

import { DbMapper } from "application/mappers/db.mapper";
import { UserMapper } from "./user.mapper";

import { UserGenreEntity } from "domain/entities/userGenre.entity";

export class UserGenreMapper implements DbMapper<UserGenreEntity, UserGenreModel> {
	toEntity(model: UserGenreModel): UserGenreEntity {
		const entity: UserGenreEntity = {
			id: model.id,
			genreId: model.genreId,
			name: model.name,
			user: undefined
		};

		if (model.user) {
			const userMapper: UserMapper = new UserMapper();
			entity.user = userMapper.toEntity(model.user);
		}

		return entity;
	}

	toModel(entity: UserGenreEntity): UserGenreModel {
		const model: UserGenreModel = new UserGenreModel();

		model.createDate = new Date();
		model.updateDate = new Date();
		model.id = entity.id;
		model.genreId = entity.genreId;
		model.name = entity.name;
		model.user = undefined;

		if (entity.user) {
			const userMapper: UserMapper = new UserMapper();
			model.user = userMapper.toModel(entity.user);
		}

		return model;
	}
}
