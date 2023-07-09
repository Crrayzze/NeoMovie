import { UseCaseInterface } from "application/useCases/usecase.interface";
import { AbstractLikeRepository } from "application/repositories/like.repository.abstract";
import { LikeEntity } from "domain/entities/like.entity";
import { UserEntity } from "domain/entities/user.entity";
import { UserMapper } from "adapters/spi/db/mappers/user.mapper";

export class GetLikeUseCase implements UseCaseInterface {
	private repo: AbstractLikeRepository;
	private user: UserEntity;

	constructor(repo: AbstractLikeRepository, user: UserEntity) {
		this.repo = repo;
		this.user = user;
	}

	async execute(): Promise<LikeEntity[]> {
		try {
			const userMapper: UserMapper = new UserMapper();
			return await this.repo.get(userMapper.toModel(this.user));
		} catch (err) {
			throw err;
		}
	}
}
