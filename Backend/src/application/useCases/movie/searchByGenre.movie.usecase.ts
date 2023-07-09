import { UseCaseInterface } from "application/useCases/usecase.interface";
import { AbstractTmdbRepository } from "application/repositories/tmdb.repository.abstract";

export class SearchByGenreUseCase implements UseCaseInterface {
	private repo: AbstractTmdbRepository;
	private genreId: string;

	constructor(repo: AbstractTmdbRepository, genreId: string) {
		this.repo = repo;
		this.genreId = genreId;
	}

	async execute(): Promise<any> {
		try {			
			const object: any = await this.repo.searchMoviesByGenre(this.genreId.toString());

			if (object.data.results) {
				return object.data.results;
			}
			else {
				return {};
			}
		} catch (err) {
			throw err;
		}
	}
}
