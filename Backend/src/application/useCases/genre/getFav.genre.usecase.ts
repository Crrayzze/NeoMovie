import { UseCaseInterface } from "application/useCases/usecase.interface";
import { AbstractUserGenreRepository } from "application/repositories/userGenre.repository.abstract";
import { UserMapper } from "adapters/spi/db/mappers/user.mapper";
import { UserEntity } from "domain/entities/user.entity";

export class GetFavGenreUseCase implements UseCaseInterface {
	private repo: AbstractUserGenreRepository;
	private user: UserEntity;

	constructor(repo: AbstractUserGenreRepository, user: UserEntity) {
		this.repo = repo;
		this.user = user;
	}

	async execute(): Promise<string[]> {
		try {		
			const userMapper: UserMapper = new UserMapper();	
			return await this.repo.getByUserId(userMapper.toModel(this.user));
		} catch (err) {
			throw err;
		}
	}
}
