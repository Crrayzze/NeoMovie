import { UseCaseInterface } from "application/useCases/usecase.interface";
import { PlaylistEntity } from "domain/entities/playlist.entities";
import { PlaylistMovieEntity } from "domain/entities/playlistMovie.entity";
import { PaylistMapper } from "adapters/spi/db/mappers/playlist.mapper";
import { AbstractPlaylistMovieRepository } from "application/repositories/playlistMovie.repository.abstract";
import { EntirePlaylistMovieEntity } from "domain/entities/entirePlaylist.entity";
import { MovieEntity } from "domain/entities/movie.entity";

export class GetByPlaylistIdsUseCase implements UseCaseInterface {
	private repo: AbstractPlaylistMovieRepository;
	private playlists: PlaylistEntity[];

	constructor(repo: AbstractPlaylistMovieRepository, playlists: PlaylistEntity[]) {
		this.repo = repo;
		this.playlists = playlists;
	}

	async execute(): Promise<EntirePlaylistMovieEntity[]> {
		try {
			const playlistMapper: PaylistMapper = new PaylistMapper();
			const entirePlaylistMovieEntities: EntirePlaylistMovieEntity[] = [];
            
			for (const playlist of this.playlists) {
				const movieEntities: MovieEntity[] = [];
				const playlistMovieEntities: PlaylistMovieEntity[] = await this.repo.getByPlaylistId(playlistMapper.toModel(playlist));
				for (const playlistMovieEntity of playlistMovieEntities) {
					const movieEntity: MovieEntity = {
						id: playlistMovieEntity.movieId,
						overview: "",
						posterPath: "",
						title: "",
						voteAverage: "",
						backdropPath: "",
						releaseDate: "",
						video: undefined
					};
					movieEntities.push(movieEntity);
				}
				const entirePlaylistEntity: EntirePlaylistMovieEntity = {id: playlist.id, title: playlist.title, movieEntities};
				entirePlaylistMovieEntities.push(entirePlaylistEntity);
			}

			return entirePlaylistMovieEntities;
		} catch (err) {
			throw err;
		}
	}
}
