import { LikeModel } from "../models/like.model";
import { DbMapper } from "application/mappers/db.mapper";
import { UserMapper } from "./user.mapper";

import { LikeEntity } from "domain/entities/like.entity";

export class LikeMapper implements DbMapper<LikeEntity, LikeModel> {
	toEntity(model: LikeModel): LikeEntity {
		const entity: LikeEntity = {
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

	toModel(entity: LikeEntity): LikeModel {
		const model: LikeModel = new LikeModel();

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
