import { UseCaseInterface } from "application/useCases/usecase.interface";
import { AbstractPlaylistRepository } from "application/repositories/playlist.repository.abstract";
import { PlaylistEntity } from "domain/entities/playlist.entities";

export class GetPlaylistByIdUseCase implements UseCaseInterface {
	private repo: AbstractPlaylistRepository;
	private id: string;

	constructor(repo: AbstractPlaylistRepository, id: string) {
		this.repo = repo;
		this.id = id;
	}

	async execute(): Promise<PlaylistEntity> {
		try {			
			return await this.repo.getById(this.id);
		} catch (err) {
			throw err;
		}
	}
}
