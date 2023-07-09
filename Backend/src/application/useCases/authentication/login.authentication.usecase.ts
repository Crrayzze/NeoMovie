import { AbstractAuthenticationRepository } from "application/repositories/authentication.repository.abstract";
import { UseCaseInterface } from "application/useCases/usecase.interface";

import { UserEntity } from "domain/entities/user.entity";

export class LoginUserUseCase implements UseCaseInterface {
	private user: UserEntity;
	private repo: AbstractAuthenticationRepository;

	constructor(user: UserEntity, repo: AbstractAuthenticationRepository) {
		this.user = user;
		this.repo = repo;
	}

	async execute(): Promise<UserEntity> {
		try {
			return await this.repo.login(this.user);            
		} catch (err) {
			throw err;
		}
	}
}
