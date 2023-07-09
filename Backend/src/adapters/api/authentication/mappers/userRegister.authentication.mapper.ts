import { ApiMapper } from "application/mappers/api.mapper";
import { UserEntity } from "domain/entities/user.entity";
import { UserRegisterPayload } from "adapters/api/authentication/payloads/authentication.payload";
import { BasePresenter } from "domain/presenters/base.presenter";

export class UserRegisterApiMapper implements ApiMapper<UserEntity, BasePresenter, UserRegisterPayload> {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	toEntity(payload: UserRegisterPayload): UserEntity {
		const entity: UserEntity = {
			username: payload.username,
			password: payload.password,
			firstConnection: true
		};
		return entity;
	}

  	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	toApi(entity: UserEntity): BasePresenter {
		throw new Error("not implemented");
	}
}
