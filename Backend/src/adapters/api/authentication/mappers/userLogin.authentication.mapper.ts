import { ApiMapper } from "application/mappers/api.mapper";
import { UserEntity } from "domain/entities/user.entity";
import { UserLoginPayload } from "adapters/api/authentication/payloads/authentication.payload";
import { BasePresenter } from "domain/presenters/base.presenter";

export class UserLoginApiMapper implements ApiMapper<UserEntity, BasePresenter, UserLoginPayload> {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	toEntity(payload: UserLoginPayload): UserEntity {
		const entity: UserEntity = {
			username: payload.username,
			password: payload.password,
			firstConnection: undefined
		};
		return entity;
	}

  	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	toApi(entity: UserEntity): BasePresenter {
		throw new Error("not implemented");
	}
}
