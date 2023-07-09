import { UseCaseInterface } from "application/useCases/usecase.interface";
import { AbstractTmdbRepository } from "application/repositories/tmdb.repository.abstract";
import { AbstractUserGenreRepository } from "application/repositories/userGenre.repository.abstract";
import { UserGenreEntity } from "domain/entities/userGenre.entity";

export class FillNameGenreUseCase implements UseCaseInterface {
	private tmdb: AbstractTmdbRepository;
	private repo: AbstractUserGenreRepository;
	private userGenres: UserGenreEntity[];

	constructor(tmdb: AbstractTmdbRepository, userGenres: UserGenreEntity[], repo: AbstractUserGenreRepository) {
		this.tmdb = tmdb;
		this.userGenres = userGenres;
		this.repo = repo;
	}

    
	async execute(): Promise<void> {
		try {
			const genres: any = await this.tmdb.getMovieGenre();
			for (const userGenre of this.userGenres) {
				for (const genre of genres.data.genres) {
					if (genre.id.toString() === userGenre.genreId) {
						userGenre.name = genre.name.toString();
					}
				}
			}

			for (const userGenre of this.userGenres) {
				await this.repo.create(userGenre);
			}
            
		} catch (err) {
			throw err;
		}

	}
	private lookFor(object: any, id: string): any {

		return object.id === id;
	}
}
