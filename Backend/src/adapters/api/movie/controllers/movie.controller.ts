import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

import { ErrorHandling } from "adapters/api/errorHandling/utils/errorHandling.utils";

import { EmptyAuthRequest, GetMovieByGenreRequest, GetMovieByNameRequest } from "../requests/movie.request";

import { GetGenreUseCase } from "application/useCases/movie/getGenre.movie.usecase";
import { SearchByGenreUseCase } from "application/useCases/movie/searchByGenre.movie.usecase";
import { GetMovieTrendingDay } from "application/useCases/movie/getTrendingDay.movie.usecase";
import { GetMovieTrendingWeek } from "application/useCases/movie/getTrendingWeek.movie.usecase";
import { DiscoverFromNetflix } from "application/useCases/movie/discoverNetflix.movie.usecase";
import { GetPopular } from "application/useCases/movie/getPopular.movie.usecase";
import { GetByNameUseCase } from "application/useCases/movie/getByName.movie.usecase";


const getGenre = async (req: FastifyRequest<EmptyAuthRequest>, reply: FastifyReply, server: FastifyInstance): Promise<void> => {
	try {
		const getGenreUseCase: GetGenreUseCase = new GetGenreUseCase(server.tmdbRepository);
		const data: any = await getGenreUseCase.execute();
		
		void reply.send(data);
	} catch (err) {
		console.log(err);
		throw ErrorHandling.createApplicationError(err, "An unknown error occurred while trying to get all movie genre, please try again");
	}
};

const getMovieByGenre = async (req: FastifyRequest<GetMovieByGenreRequest>, reply: FastifyReply, server: FastifyInstance): Promise<void> => {
	try {
		const searchByGenreUseCase: SearchByGenreUseCase = new SearchByGenreUseCase(server.tmdbRepository, req.query.genre_id);
		const data: any = await searchByGenreUseCase.execute();
		
		void reply.send(data);
	} catch (err) {
		console.log(err);
		throw ErrorHandling.createApplicationError(err, "An unknown error occurred while trying to search movies by genre, please try again");
	}
};

const getMovieByName = async (req: FastifyRequest<GetMovieByNameRequest>, reply: FastifyReply, server: FastifyInstance): Promise<void> => {
	try {
		const getByNameUseCase: GetByNameUseCase = new GetByNameUseCase(server.tmdbRepository, req.query.name);
		const data: any = await getByNameUseCase.execute();
		
		void reply.send(data);
	} catch (err) {
		console.log(err);
		throw ErrorHandling.createApplicationError(err, "An unknown error occurred while trying to search movies by name, please try again");
	}
};

const getDiscovery = async (req: FastifyRequest<EmptyAuthRequest>, reply: FastifyReply, server: FastifyInstance): Promise<void> => {
	try {
		const discoverFromNetflix: DiscoverFromNetflix = new DiscoverFromNetflix(server.tmdbRepository);
		const data: any = await discoverFromNetflix.execute();
		
		void reply.send(data);
	} catch (err) {
		console.log(err);
		throw ErrorHandling.createApplicationError(err, "An unknown error occurred while trying to get movie to discover, please try again");
	}
};

const getMoviePopular = async (req: FastifyRequest<EmptyAuthRequest>, reply: FastifyReply, server: FastifyInstance): Promise<void> => {
	try {
		const getPopular: GetPopular = new GetPopular(server.tmdbRepository);
		const data: any = await getPopular.execute();
		
		void reply.send(data);
	} catch (err) {
		console.log(err);
		throw ErrorHandling.createApplicationError(err, "An unknown error occurred while trying to get movie popular, please try again");
	}
};

const getMovieTrendingDay = async (req: FastifyRequest<EmptyAuthRequest>, reply: FastifyReply, server: FastifyInstance): Promise<void> => {
	try {
		const getMovieTrendingDayUseCase: GetMovieTrendingDay = new GetMovieTrendingDay(server.tmdbRepository);
		const data: any = await getMovieTrendingDayUseCase.execute();
		
		void reply.send(data);
	} catch (err) {
		console.log(err);
		throw ErrorHandling.createApplicationError(err, "An unknown error occurred while trying to get movie trends, please try again");
	}
};

const getMovieTrendingWeek = async (req: FastifyRequest<EmptyAuthRequest>, reply: FastifyReply, server: FastifyInstance): Promise<void> => {
	try {
		const getMovieTrendingWeekUseCase: GetMovieTrendingWeek = new GetMovieTrendingWeek(server.tmdbRepository);
		const data: any = await getMovieTrendingWeekUseCase.execute();
		
		void reply.send(data);
	} catch (err) {
		console.log(err);
		throw ErrorHandling.createApplicationError(err, "An unknown error occurred while trying to get movie trends, please try again");
	}
};

const getMovieByUserGenre = async (req: FastifyRequest<EmptyAuthRequest>, reply: FastifyReply, server: FastifyInstance): Promise<void> => {
	try {
		const getMovieTrendingWeekUseCase: GetMovieTrendingWeek = new GetMovieTrendingWeek(server.tmdbRepository);
		const data: any = await getMovieTrendingWeekUseCase.execute();
		
		void reply.send(data);
	} catch (err) {
		console.log(err);
		throw ErrorHandling.createApplicationError(err, "An unknown error occurred while trying to get movie users genre, please try again");
	}
};

export default { getMovieByUserGenre, getGenre, getMovieByGenre, getMovieTrendingDay, getMovieTrendingWeek, getDiscovery, getMoviePopular, getMovieByName };
