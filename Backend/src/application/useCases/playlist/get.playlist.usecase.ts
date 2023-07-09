import { UseCaseInterface } from "application/useCases/usecase.interface";
import { AbstractPlaylistRepository } from "application/repositories/playlist.repository.abstract";
import { PlaylistEntity } from "domain/entities/playlist.entities";
import { UserMapper } from "adapters/spi/db/mappers/user.mapper";
import { UserEntity } from "domain/entities/user.entity";

export class GetPlaylistUseCase implements UseCaseInterface {
	private repo: AbstractPlaylistRepository;
	private user: UserEntity;

	constructor(repo: AbstractPlaylistRepository, user: UserEntity) {
		this.repo = repo;
		this.user = user;
	}

	async execute(): Promise<PlaylistEntity[]> {
		try {		
			const userMapper: UserMapper = new UserMapper();	
			return await this.repo.getAll(userMapper.toModel(this.user));
		} catch (err) {
			throw err;
		}
	}
}
