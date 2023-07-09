import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

import { ErrorHandling } from "adapters/api/errorHandling/utils/errorHandling.utils";

import { PostFavouriteGenreRequest } from "../requests/genre.request";
import { UserGenreEntity } from "domain/entities/userGenre.entity";
import { FillNameGenreUseCase } from "application/useCases/genre/fillName.genre.usecase";
import { SaveUserUseCase } from "application/useCases/authentication/save.authentication.usecase";
import { UserEntity } from "domain/entities/user.entity";
import { EmptyAuthRequest } from "adapters/api/movie/requests/movie.request";
import { GetFavGenreUseCase } from "application/useCases/genre/getFav.genre.usecase";


const postFavouriteGenre = async (req: FastifyRequest<PostFavouriteGenreRequest>, reply: FastifyReply, server: FastifyInstance): Promise<void> => {
	try {
		const userGenreEntities: UserGenreEntity[] = [];
		for (const currentGenreId of req.body.genres_id) {
			const userGenreEntityTemp: UserGenreEntity = {user: req.body.authUser, genreId: currentGenreId, name: undefined };
			userGenreEntities.push(userGenreEntityTemp);
		}

		const fillNameGenreUseCase: FillNameGenreUseCase = new FillNameGenreUseCase(server.tmdbRepository, userGenreEntities, server.userGenreRepository);
		await fillNameGenreUseCase.execute();

		const userEntity: UserEntity = req.body.authUser;
		userEntity.firstConnection = false;

		const saveUserUseCase: SaveUserUseCase = new SaveUserUseCase(userEntity, server.authenticationRepository);
		await saveUserUseCase.execute();

		void reply.send({ message: "Favourite genres added" });
	} catch (err) {
		console.log(err);
		throw ErrorHandling.createApplicationError(err, "An unknown error occurred while trying to post favourite genre, please try again");
	}
};

const getFavouriteGenre = async (req: FastifyRequest<EmptyAuthRequest>, reply: FastifyReply, server: FastifyInstance): Promise<void> => {
	try {
		const getFavGenreUseCase: GetFavGenreUseCase = new GetFavGenreUseCase(server.userGenreRepository, req.body.authUser);
		const genreIds: string[] = await getFavGenreUseCase.execute(); 
		console.log(genreIds);
		void reply.send({ genres_id: genreIds });
	} catch (err) {
		console.log(err);
		throw ErrorHandling.createApplicationError(err, "An unknown error occurred while trying to post favourite genre, please try again");
	}
};

export default { postFavouriteGenre, getFavouriteGenre };
