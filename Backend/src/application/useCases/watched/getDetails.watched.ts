import { UseCaseInterface } from "application/useCases/usecase.interface";
import { AbstractTmdbRepository } from "application/repositories/tmdb.repository.abstract";

import { WatchedEntity } from "domain/entities/watched.entity";
import { MovieEntity } from "domain/entities/movie.entity";


export class GetDetailsWatchedUseCase implements UseCaseInterface {
	private repo: AbstractTmdbRepository;
	private watchedEntities: WatchedEntity[];

	constructor(repo: AbstractTmdbRepository, watchedEntities: WatchedEntity[]) {
		this.repo = repo;
		this.watchedEntities = watchedEntities;
	}

	async execute(): Promise<MovieEntity[]> {
		try {
			const movieEntities: MovieEntity[] = [];

			for (const entity of this.watchedEntities) {
				const data: any = await this.repo.getMovieById(entity.movieId);
				const movieEntity: MovieEntity = {
					id: entity.movieId,
					overview: data.overview,
					posterPath: data.poster_path,
					title: data.title,
					voteAverage: data.vote_average,
					backdropPath: data.backdrop_path,
					releaseDate: data.release_date,
					video: data.video
				};
				movieEntities.push(movieEntity);
			}
            
			return movieEntities;
		} catch (err) {
			throw err;
		}
	}
}
