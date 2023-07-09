import { AbstractAuthenticationRepository } from "application/repositories/authentication.repository.abstract";
import { UseCaseInterface } from "application/useCases/usecase.interface";

import { UserEntity } from "domain/entities/user.entity";
import { GenericResponseEntity } from "domain/entities/genericResponse.entity";

export class SaveUserUseCase implements UseCaseInterface {
	private user: UserEntity;
	private repo: AbstractAuthenticationRepository;

	constructor(user: UserEntity, repo: AbstractAuthenticationRepository) {
		this.user = user;
		this.repo = repo;
	}

	async execute(): Promise<GenericResponseEntity> {
		try {			
			await this.repo.createAccount(this.user);

			return { message: "User saved" };
		} catch (err) {
			throw err;
		}
	}
}
