import { UseCaseInterface } from "application/useCases/usecase.interface";
import { AbstractWatchedRepository } from "application/repositories/watched.repository.abstract";
import { WatchedEntity } from "domain/entities/watched.entity";
import { UserMapper } from "adapters/spi/db/mappers/user.mapper";

export class CreateWatchedUseCase implements UseCaseInterface {
	private repo: AbstractWatchedRepository;
	private watched: WatchedEntity;

	constructor(repo: AbstractWatchedRepository, watched: WatchedEntity) {
		this.repo = repo;
		this.watched = watched;
	}

	async execute(): Promise<void> {
		try {
			const userMapper: UserMapper = new UserMapper();
			if (!await this.repo.getByUserMovie(userMapper.toModel(this.watched.user), this.watched)) {
				await this.repo.create(this.watched);
			}
		} catch (err) {
			throw err;
		}
	}
}
