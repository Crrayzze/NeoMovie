import { UseCaseInterface } from "application/useCases/usecase.interface";
import { AbstractPlaylistRepository } from "application/repositories/playlist.repository.abstract";
import { PlaylistEntity } from "domain/entities/playlist.entities";

export class CreatePlaylistUseCase implements UseCaseInterface {
	private repo: AbstractPlaylistRepository;
	private playlist: PlaylistEntity;

	constructor(repo: AbstractPlaylistRepository, playlist: PlaylistEntity) {
		this.repo = repo;
		this.playlist = playlist;
	}

	async execute(): Promise<void> {
		try {			
			await this.repo.create(this.playlist);
		} catch (err) {
			throw err;
		}
	}
}
