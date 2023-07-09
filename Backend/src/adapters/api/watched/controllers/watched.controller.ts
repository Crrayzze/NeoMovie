import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

import { ErrorHandling } from "adapters/api/errorHandling/utils/errorHandling.utils";

import { PostWatchedRequest, EmptyAuthRequest } from "../requests/watched.request";

import { WatchedEntity } from "domain/entities/watched.entity";
import { CreateWatchedUseCase } from "application/useCases/watched/create.watched.usecase";
import { GetWatchedUseCase } from "application/useCases/watched/get.watched.usecase";
import { GetDetailsWatchedUseCase } from "application/useCases/watched/getDetails.watched";
import { MovieApiMapper } from "adapters/api/playlist/mappers/movie.mapper";
import { MovieEntity } from "domain/entities/movie.entity";
import { MoviePresenter } from "adapters/api/playlist/presenters/movie.presenter";

const postWatched = async (req: FastifyRequest<PostWatchedRequest>, reply: FastifyReply, server: FastifyInstance): Promise<void> => {
	try {
		const watchedEntity: WatchedEntity = { movieId: req.body.movieId, user: req.body.authUser };
		const createWatchedUseCase: CreateWatchedUseCase = new CreateWatchedUseCase(server.watchedRepository, watchedEntity);
		await createWatchedUseCase.execute();

		void reply.send({ message: "Movie watched" });
	} catch (err) {
		console.log(err);
		throw ErrorHandling.createApplicationError(err, "An unknown error occurred while trying to define a movie as watched, please try again");
	}
};

const getWatched = async (req: FastifyRequest<EmptyAuthRequest>, reply: FastifyReply, server: FastifyInstance): Promise<void> => {
	try {
		// 1-get all likes relation from the user connected and prepare the object
		const getWatchedUseCase: GetWatchedUseCase = new GetWatchedUseCase(server.watchedRepository, req.body.authUser);
		const watchedEntities: WatchedEntity[] = await getWatchedUseCase.execute();


		// 2-get the movie data from tmdb while putting it in the object (not every value)
		const getDetailsWatchedUseCase: GetDetailsWatchedUseCase = new GetDetailsWatchedUseCase(server.tmdbRepository, watchedEntities);
		const movieEntities: MovieEntity[] = await getDetailsWatchedUseCase.execute();

		// 3-do a presenter to send back this data
		const movieMapper: MovieApiMapper = new MovieApiMapper();
		const moviePresenters: MoviePresenter[] = [];

		for (const moviEntity of movieEntities) {
			moviePresenters.push(movieMapper.toApi(moviEntity));
		}

		void reply.send(moviePresenters);
	} catch (err) {
		console.log(err);
		throw ErrorHandling.createApplicationError(err, "An unknown error occurred while trying to get your liked movies, please try again");
	}
};

export default { postWatched, getWatched };
