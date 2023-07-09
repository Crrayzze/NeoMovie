import { UseCaseInterface } from "application/useCases/usecase.interface";
import { AbstractWatchedRepository } from "application/repositories/watched.repository.abstract";
import { WatchedEntity } from "domain/entities/watched.entity";
import { UserEntity } from "domain/entities/user.entity";
import { UserMapper } from "adapters/spi/db/mappers/user.mapper";

export class GetWatchedUseCase implements UseCaseInterface {
	private repo: AbstractWatchedRepository;
	private user: UserEntity;

	constructor(repo: AbstractWatchedRepository, user: UserEntity) {
		this.repo = repo;
		this.user = user;
	}

	async execute(): Promise<WatchedEntity[]> {
		try {
			const userMapper: UserMapper = new UserMapper();
			return await this.repo.get(userMapper.toModel(this.user));
		} catch (err) {
			throw err;
		}
	}
}
