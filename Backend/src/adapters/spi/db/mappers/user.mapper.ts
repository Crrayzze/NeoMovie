import { UserModel } from "adapters/spi/db/models/user.model";

import { DbMapper } from "application/mappers/db.mapper";

import { UserEntity } from "domain/entities/user.entity";

export class UserMapper implements DbMapper<UserEntity, UserModel> {
	toEntity(model: UserModel): UserEntity {
		const entity: UserEntity = {
			id: model.id,
			username: model.username,
			password: model.password,
			token: model.token,
			firstConnection: model.firstConnection
		};

		return entity;
	}

	toModel(entity: UserEntity): UserModel {
		const model: UserModel = new UserModel();

		model.createDate = new Date();
		model.updateDate = new Date();
		model.id = entity.id;
		model.username = entity.username;
		model.password = entity.password;
		model.token = entity.token;
		model.firstConnection = entity.firstConnection;

		return model;
	}
}
