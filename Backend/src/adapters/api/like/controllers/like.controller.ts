import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

import { ErrorHandling } from "adapters/api/errorHandling/utils/errorHandling.utils";

import { PostLikeRequest, EmptyAuthRequest } from "../requests/like.request";

import { LikeEntity } from "domain/entities/like.entity";
import { CreateLikeUseCase } from "application/useCases/like/create.like.usecase";
import { GetLikeUseCase } from "application/useCases/like/get.like.usecase";
import { GetDetailsLikeUseCase } from "application/useCases/like/getDetails.like";
import { MovieEntity } from "domain/entities/movie.entity";
import { MovieApiMapper } from "adapters/api/playlist/mappers/movie.mapper";
import { MoviePresenter } from "adapters/api/playlist/presenters/movie.presenter";

const postLike = async (req: FastifyRequest<PostLikeRequest>, reply: FastifyReply, server: FastifyInstance): Promise<void> => {
	try {
		const likeEntity: LikeEntity = {movieId: req.body.movieId, user: req.body.authUser};
		const createLikeUseCase: CreateLikeUseCase = new CreateLikeUseCase(server.likeRepository, likeEntity);
		await createLikeUseCase.execute();

		void reply.send({ message: "Movie liked" });
	} catch (err) {
		console.log(err);
		throw ErrorHandling.createApplicationError(err, "An unknown error occurred while trying to like a movie, please try again");
	}
};

const getLike = async (req: FastifyRequest<EmptyAuthRequest>, reply: FastifyReply, server: FastifyInstance): Promise<void> => {
	try {
		// 1-get all likes relation from the user connected and prepare the object
		const getLikeUseCase: GetLikeUseCase = new GetLikeUseCase(server.likeRepository, req.body.authUser);
		const likeEntities: LikeEntity[] = await getLikeUseCase.execute();


		// 2-get the movie data from tmdb while putting it in the object (not every value)
		const getDetailsLikeUseCase: GetDetailsLikeUseCase = new GetDetailsLikeUseCase(server.tmdbRepository, likeEntities);
		const movieEntities: MovieEntity[] = await getDetailsLikeUseCase.execute();

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

export default { postLike, getLike };
