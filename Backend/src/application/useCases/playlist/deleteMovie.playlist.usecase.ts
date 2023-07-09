import { UseCaseInterface } from "application/useCases/usecase.interface";
import { AbstractPlaylistMovieRepository } from "application/repositories/playlistMovie.repository.abstract";

export class DeleteMoviePlaylistUseCase implements UseCaseInterface {
	private repo: AbstractPlaylistMovieRepository;
	private playlistMovieId: string;

	constructor(repo: AbstractPlaylistMovieRepository, playlistMovieId: string) {
		this.repo = repo;
		this.playlistMovieId = playlistMovieId;
	}

	async execute(): Promise<void> {
		try {			
			await this.repo.delete(this.playlistMovieId);
		} catch (err) {
			throw err;
		}
	}
}
