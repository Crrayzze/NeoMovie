import fp from "fastify-plugin";

import { FastifyReply, FastifyInstance, FastifyPluginAsync, FastifyRequest } from "fastify";
import middleware from "adapters/api/authentication/middlewares/authentication.middleware";
import { postPlaylistSchema, postMoviePlaylistSchema, deleteMoviePlaylistSchema, getPlaylistSchema, getPlaylistListSchema } from "../schemas/playlist.schema";
import { PostPlaylistRequest, PostMovieRequest, DeleteMovieRequest } from "../requests/playlist.request";

import playlistController from "../controllers/playlist.controller";
import { EmptyAuthRequest } from "adapters/api/movie/requests/movie.request";

// eslint-disable-next-line @typescript-eslint/require-await
const asyncRoutes: FastifyPluginAsync = async (server: FastifyInstance): Promise<void> => {
	const BASE_URL: string = "/api/playlist";

	server.route({
		method: "POST",
		url: `${BASE_URL}`,
		preValidation: async (req: FastifyRequest, reply: FastifyReply): Promise<void> => await middleware.validAuth(req, reply, server),
		handler: async (req: FastifyRequest<PostPlaylistRequest>, reply: FastifyReply): Promise<void> => 
			await playlistController.postPlaylist(req, reply, server),
		schema: postPlaylistSchema
	});

	server.route({
		method: "GET",
		url: `${BASE_URL}`,
		preValidation: async (req: FastifyRequest, reply: FastifyReply): Promise<void> => await middleware.validAuth(req, reply, server),
		handler: async (req: FastifyRequest<EmptyAuthRequest>, reply: FastifyReply): Promise<void> => 
			await playlistController.getPlaylist(req, reply, server),
		schema: getPlaylistSchema
	});

	server.route({
		method: "GET",
		url: `${BASE_URL}/list`,
		preValidation: async (req: FastifyRequest, reply: FastifyReply): Promise<void> => await middleware.validAuth(req, reply, server),
		handler: async (req: FastifyRequest<EmptyAuthRequest>, reply: FastifyReply): Promise<void> => 
			await playlistController.getPlaylist(req, reply, server),
		schema: getPlaylistListSchema
	});

	server.route({
		method: "POST",
		url: `${BASE_URL}/movie`,
		preValidation: async (req: FastifyRequest, reply: FastifyReply): Promise<void> => await middleware.validAuth(req, reply, server),
		handler: async (req: FastifyRequest<PostMovieRequest>, reply: FastifyReply): Promise<void> => 
			await playlistController.postMovie(req, reply, server),
		schema: postMoviePlaylistSchema
	});

	server.route({
		method: "DELETE",
		url: `${BASE_URL}/movie`,
		preValidation: async (req: FastifyRequest, reply: FastifyReply): Promise<void> => await middleware.validAuth(req, reply, server),
		handler: async (req: FastifyRequest<DeleteMovieRequest>, reply: FastifyReply): Promise<void> => 
			await playlistController.deleteMovie(req, reply, server),
		schema: deleteMoviePlaylistSchema
	});

};

export default fp(asyncRoutes);
