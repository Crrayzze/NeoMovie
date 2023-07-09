import { UseCaseInterface } from "application/useCases/usecase.interface";
import { AbstractPlaylistMovieRepository } from "application/repositories/playlistMovie.repository.abstract";
import { PlaylistMovieEntity } from "domain/entities/playlistMovie.entity";
import { PaylistMapper } from "adapters/spi/db/mappers/playlist.mapper";

export class PostMoviePlaylistUseCase implements UseCaseInterface {
	private repo: AbstractPlaylistMovieRepository;
	private playlist: PlaylistMovieEntity;

	constructor(repo: AbstractPlaylistMovieRepository, playlist: PlaylistMovieEntity) {
		this.repo = repo;
		this.playlist = playlist;
	}

	async execute(): Promise<void> {
		try {
			const playlistMapper: PaylistMapper = new PaylistMapper();
			if (!await this.repo.getByPlaylistMovie(playlistMapper.toModel(this.playlist.playlist), this.playlist)) {
				await this.repo.create(this.playlist);
			}
		} catch (err) {
			throw err;
		}
	}
}
