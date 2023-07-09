import fp from "fastify-plugin";

import { FastifyReply, FastifyInstance, FastifyPluginAsync, FastifyRequest } from "fastify";
import middleware from "adapters/api/authentication/middlewares/authentication.middleware";
import { postFavouriteGenreSchema , getFavouriteGenreSchema} from "../schemas/genre.schema";
import { PostFavouriteGenreRequest } from "../requests/genre.request";

import watchedController from "../controllers/genre.controller";
import { EmptyAuthRequest } from "adapters/api/movie/requests/movie.request";

// eslint-disable-next-line @typescript-eslint/require-await
const asyncRoutes: FastifyPluginAsync = async (server: FastifyInstance): Promise<void> => {
	const BASE_URL: string = "/api/genre";

	server.route({
		method: "POST",
		url: `${BASE_URL}`,
		preValidation: async (req: FastifyRequest, reply: FastifyReply): Promise<void> => await middleware.validAuth(req, reply, server),
		handler: async (req: FastifyRequest<PostFavouriteGenreRequest>, reply: FastifyReply): Promise<void> => 
			await watchedController.postFavouriteGenre(req, reply, server),
		schema: postFavouriteGenreSchema
	});

	server.route({
		method: "GET",
		url: `${BASE_URL}`,
		preValidation: async (req: FastifyRequest, reply: FastifyReply): Promise<void> => await middleware.validAuth(req, reply, server),
		handler: async (req: FastifyRequest<EmptyAuthRequest>, reply: FastifyReply): Promise<void> => 
			await watchedController.getFavouriteGenre(req, reply, server),
		schema: getFavouriteGenreSchema
	});
};

export default fp(asyncRoutes);
