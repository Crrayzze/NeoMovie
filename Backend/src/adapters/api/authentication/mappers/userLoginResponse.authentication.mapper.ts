import { ApiMapper } from "application/mappers/api.mapper";
import { UserRegisterPayload } from "adapters/api/authentication/payloads/authentication.payload";
import { LoginResponsePresenter } from "adapters/api/authentication/presenters/loginResponse.authentication.presenter";
import { UserEntity } from "domain/entities/user.entity";

export class LogginResponseApiMapper implements ApiMapper<UserEntity, LoginResponsePresenter, UserRegisterPayload> {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	toEntity(payload: UserRegisterPayload): UserEntity {
		throw new Error("not implemented");
	}

	toApi(entity: UserEntity): LoginResponsePresenter {
		const presenter: LoginResponsePresenter = {
			message: "User Connected",
			token: entity.token,
			firstConnection: entity.firstConnection
		};

		return presenter;
	}
}
