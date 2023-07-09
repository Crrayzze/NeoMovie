import { AbstractAuthenticationRepository } from "application/repositories/authentication.repository.abstract";
import { UseCaseInterface } from "application/useCases/usecase.interface";

import { UserEntity } from "domain/entities/user.entity";

export class AuthenticateUserTokenUseCase implements UseCaseInterface {
	private token: string;
	private repo: AbstractAuthenticationRepository;

	constructor(token: string, repo: AbstractAuthenticationRepository) {
		this.token = token;
		this.repo = repo;
	}

	async execute(): Promise<UserEntity> {
		try {
			const userEntity: UserEntity = await this.repo.middleware(this.token);
			return userEntity;

		} catch (err) {
			throw err;
		}
	}
}
