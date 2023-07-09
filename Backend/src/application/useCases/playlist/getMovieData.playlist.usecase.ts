import { UseCaseInterface } from "application/useCases/usecase.interface";
import { AbstractTmdbRepository } from "application/repositories/tmdb.repository.abstract";

import { EntirePlaylistMovieEntity } from "domain/entities/entirePlaylist.entity";

export class GetMovieDataFillPlaylistUseCase implements UseCaseInterface {
	private repo: AbstractTmdbRepository;
	private playlists: EntirePlaylistMovieEntity[];

	constructor(repo: AbstractTmdbRepository, playlists: EntirePlaylistMovieEntity[]) {
		this.repo = repo;
		this.playlists = playlists;
	}

	async execute(): Promise<EntirePlaylistMovieEntity[]> {
		try {
			for (const playlist of this.playlists) {
				for (const movie of playlist.movieEntities) {
					const data: any = await this.repo.getMovieById(movie.id);
					movie.overview = data.overview;
					movie.posterPath = data.poster_path;
					movie.title = data.title;
					movie.voteAverage = data.vote_average;
					movie.backdropPath = data.backdrop_path;
					movie.releaseDate = data.release_date;
					movie.video = data.video;
				}
			}
            
			return this.playlists;
		} catch (err) {
			throw err;
		}
	}
}
