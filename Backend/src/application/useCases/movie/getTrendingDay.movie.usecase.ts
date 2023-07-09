import { UseCaseInterface } from "application/useCases/usecase.interface";
import { AbstractTmdbRepository } from "application/repositories/tmdb.repository.abstract";

export class GetMovieTrendingDay implements UseCaseInterface {
	private repo: AbstractTmdbRepository;

	constructor(repo: AbstractTmdbRepository) {
		this.repo = repo;
	}

	async execute(): Promise<any> {
		try {			
			const object: any = await this.repo.getTrendingDay();

			if (object.results) {
				return object.results;
			}
			else {
				return {};
			}
		} catch (err) {
			throw err;
		}
	}
}
