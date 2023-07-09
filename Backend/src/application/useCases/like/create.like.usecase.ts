import { UseCaseInterface } from "application/useCases/usecase.interface";
import { AbstractLikeRepository } from "application/repositories/like.repository.abstract";
import { LikeEntity } from "domain/entities/like.entity";
import { UserMapper } from "adapters/spi/db/mappers/user.mapper";

export class CreateLikeUseCase implements UseCaseInterface {
	private repo: AbstractLikeRepository;
	private like: LikeEntity;

	constructor(repo: AbstractLikeRepository, like: LikeEntity) {
		this.repo = repo;
		this.like = like;
	}

	async execute(): Promise<void> {
		try {			
			const userMapper: UserMapper = new UserMapper();
			if (!await this.repo.getByUserMovie(userMapper.toModel(this.like.user), this.like)) {
				await this.repo.create(this.like);
			}
		} catch (err) {
			throw err;
		}
	}
}
