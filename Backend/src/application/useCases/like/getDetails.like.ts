import { UseCaseInterface } from "application/useCases/usecase.interface";
import { AbstractTmdbRepository } from "application/repositories/tmdb.repository.abstract";

import { LikeEntity } from "domain/entities/like.entity";
import { MovieEntity } from "domain/entities/movie.entity";


export class GetDetailsLikeUseCase implements UseCaseInterface {
	private repo: AbstractTmdbRepository;
	private likeEntities: LikeEntity[];

	constructor(repo: AbstractTmdbRepository, likeEntities: LikeEntity[]) {
		this.repo = repo;
		this.likeEntities = likeEntities;
	}

	async execute(): Promise<MovieEntity[]> {
		try {
			const movieEntities: MovieEntity[] = [];

			for (const likeEntity of this.likeEntities) {
				const data: any = await this.repo.getMovieById(likeEntity.movieId);
				const movieEntity: MovieEntity = {
					id: likeEntity.movieId,
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
