import { UseCaseInterface } from "application/useCases/usecase.interface";
import { AbstractTmdbRepository } from "application/repositories/tmdb.repository.abstract";

export class GetGenreUseCase implements UseCaseInterface {
	private repo: AbstractTmdbRepository;

	constructor(repo: AbstractTmdbRepository) {
		this.repo = repo;
	}

	async execute(): Promise<any> {
		try {			
			const object: any = await this.repo.getMovieGenre();

			return object.data;
		} catch (err) {
			throw err;
		}
	}
}
