import { PlaylistModel } from "../models/playlist.model";

import { DbMapper } from "application/mappers/db.mapper";
import { UserMapper } from "./user.mapper";

import { PlaylistEntity } from "domain/entities/playlist.entities";

export class PaylistMapper implements DbMapper<PlaylistEntity, PlaylistModel> {
	toEntity(model: PlaylistModel): PlaylistEntity {
		const entity: PlaylistEntity = {
			id: model.id,
			title: model.title,
			user: undefined
		};

		if (model.user) {
			const userMapper: UserMapper = new UserMapper();
			entity.user = userMapper.toEntity(model.user);
		}

		return entity;
	}

	toModel(entity: PlaylistEntity): PlaylistModel {
		const model: PlaylistModel = new PlaylistModel();

		model.createDate = new Date();
		model.updateDate = new Date();
		model.id = entity.id;
		model.title = entity.title;

		if (entity.user) {
			const userMapper: UserMapper = new UserMapper();
			model.user = userMapper.toModel(entity.user);
		}

		return model;
	}
}
