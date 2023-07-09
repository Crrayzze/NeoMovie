import { WatchedModel } from "../models/watched.model";
import { DbMapper } from "application/mappers/db.mapper";
import { UserMapper } from "./user.mapper";

import { WatchedEntity } from "domain/entities/watched.entity";

export class WatchedMapper implements DbMapper<WatchedEntity, WatchedModel> {
	toEntity(model: WatchedModel): WatchedEntity {
		const entity: WatchedEntity = {
			id: model.id,
			movieId: model.movieId,
			user: undefined
		};

		if (model.user) {
			const userMapper: UserMapper = new UserMapper();
			entity.user = userMapper.toEntity(model.user);
		}

		return entity;
	}

	toModel(entity: WatchedEntity): WatchedModel {
		const model: WatchedModel = new WatchedModel();

		model.createDate = new Date();
		model.updateDate = new Date();
		model.id = entity.id;
		model.movieId = entity.movieId;

		if (entity.user) {
			const userMapper: UserMapper = new UserMapper();
			model.user = userMapper.toModel(entity.user);
		}

		return model;
	}
}
