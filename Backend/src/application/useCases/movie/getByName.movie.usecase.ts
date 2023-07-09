import { UseCaseInterface } from "application/useCases/usecase.interface";
import { AbstractTmdbRepository } from "application/repositories/tmdb.repository.abstract";

export class GetByNameUseCase implements UseCaseInterface {
	private repo: AbstractTmdbRepository;
	private name: string;

	constructor(repo: AbstractTmdbRepository, name: string) {
		this.repo = repo;
		this.name = name;
	}

	async execute(): Promise<any> {
		try {			
			const object: any = await this.repo.searchByName(this.name);
			console.log(object.results);
			if (object.results) {
				return object.results;
			}
			else {
				return {};
			}
		} catch (err) {
			throw err;
		}
	}
}
