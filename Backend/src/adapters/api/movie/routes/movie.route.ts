import fp from "fastify-plugin";

import { FastifyReply, FastifyInstance, FastifyPluginAsync, FastifyRequest } from "fastify";
import middleware from "adapters/api/authentication/middlewares/authentication.middleware";
import {
	getMovieGenreSchema, 
	getMovieByGenreSchema, 
	getMovieTrendingDaySchema, 
	getMovieTrendingWeekSchema, 
	getDiscoverSchema, 
	getMovieByNameSchema, 
	getMovieByUserGenreSchema 
} from "../schemas/movie.schema";
import { EmptyAuthRequest, GetMovieByGenreRequest, GetMovieByNameRequest } from "../requests/movie.request";

import movieController from "../controllers/movie.controller";

// eslint-disable-next-line @typescript-eslint/require-await
const asyncRoutes: FastifyPluginAsync = async (server: FastifyInstance): Promise<void> => {
	const BASE_URL: string = "/api/movie";

	server.route({
		method: "GET",
		url: `${BASE_URL}/genre`,
		preValidation: async (req: FastifyRequest, reply: FastifyReply): Promise<void> => await middleware.validAuth(req, reply, server),
		handler: async (req: FastifyRequest<EmptyAuthRequest>, reply: FastifyReply): Promise<void> => 
			await movieController.getGenre(req, reply, server),
		schema: getMovieGenreSchema
	});

	server.route({
		method: "GET",
		url: `${BASE_URL}/name`,
		preValidation: async (req: FastifyRequest, reply: FastifyReply): Promise<void> => await middleware.validAuth(req, reply, server),
		handler: async (req: FastifyRequest<GetMovieByNameRequest>, reply: FastifyReply): Promise<void> => 
			await movieController.getMovieByName(req, reply, server),
		schema: getMovieByNameSchema
	});

	server.route({
		method: "GET",
		url: `${BASE_URL}/trending/day`,
		preValidation: async (req: FastifyRequest, reply: FastifyReply): Promise<void> => await middleware.validAuth(req, reply, server),
		handler: async (req: FastifyRequest<EmptyAuthRequest>, reply: FastifyReply): Promise<void> => 
			await movieController.getMovieTrendingDay(req, reply, server),
		schema: getMovieTrendingDaySchema
	});

	server.route({
		method: "GET",
		url: `${BASE_URL}/trending/week`,
		preValidation: async (req: FastifyRequest, reply: FastifyReply): Promise<void> => await middleware.validAuth(req, reply, server),
		handler: async (req: FastifyRequest<EmptyAuthRequest>, reply: FastifyReply): Promise<void> => 
			await movieController.getMovieTrendingDay(req, reply, server),
		schema: getMovieTrendingWeekSchema
	});

	server.route({
		method: "GET",
		url: `${BASE_URL}/popular`,
		preValidation: async (req: FastifyRequest, reply: FastifyReply): Promise<void> => await middleware.validAuth(req, reply, server),
		handler: async (req: FastifyRequest<EmptyAuthRequest>, reply: FastifyReply): Promise<void> => 
			await movieController.getMoviePopular(req, reply, server),
		schema: getMovieTrendingWeekSchema
	});

	server.route({
		method: "GET",
		url: `${BASE_URL}/discover`,
		preValidation: async (req: FastifyRequest, reply: FastifyReply): Promise<void> => await middleware.validAuth(req, reply, server),
		handler: async (req: FastifyRequest<EmptyAuthRequest>, reply: FastifyReply): Promise<void> => 
			await movieController.getMovieTrendingDay(req, reply, server),
		schema: getDiscoverSchema
	});

	server.route({
		method: "GET",
		url: `${BASE_URL}/search/genre`,
		preValidation: async (req: FastifyRequest, reply: FastifyReply): Promise<void> => await middleware.validAuth(req, reply, server),
		handler: async (req: FastifyRequest<GetMovieByGenreRequest>, reply: FastifyReply): Promise<void> => 
			await movieController.getMovieByGenre(req, reply, server),
		schema: getMovieByGenreSchema
	});

	server.route({
		method: "GET",
		url: `${BASE_URL}/user/genre`,
		preValidation: async (req: FastifyRequest, reply: FastifyReply): Promise<void> => await middleware.validAuth(req, reply, server),
		handler: async (req: FastifyRequest<EmptyAuthRequest>, reply: FastifyReply): Promise<void> => 
			await movieController.getGenre(req, reply, server),
		schema: getMovieByUserGenreSchema
	});
};


export default fp(asyncRoutes);
