import fp from "fastify-plugin";

import { FastifyReply, FastifyInstance, FastifyPluginAsync, FastifyRequest } from "fastify";
import middleware from "adapters/api/authentication/middlewares/authentication.middleware";
import { postWatchedSchema, getWatchedSchema } from "../schemas/watched.schema";
import { PostWatchedRequest, EmptyAuthRequest } from "../requests/watched.request";

import watchedController from "../controllers/watched.controller";

// eslint-disable-next-line @typescript-eslint/require-await
const asyncRoutes: FastifyPluginAsync = async (server: FastifyInstance): Promise<void> => {
	const BASE_URL: string = "/api/watched";

	server.route({
		method: "POST",
		url: `${BASE_URL}`,
		preValidation: async (req: FastifyRequest, reply: FastifyReply): Promise<void> => await middleware.validAuth(req, reply, server),
		handler: async (req: FastifyRequest<PostWatchedRequest>, reply: FastifyReply): Promise<void> => 
			await watchedController.postWatched(req, reply, server),
		schema: postWatchedSchema
	});

	server.route({
		method: "GET",
		url: `${BASE_URL}`,
		preValidation: async (req: FastifyRequest, reply: FastifyReply): Promise<void> => await middleware.validAuth(req, reply, server),
		handler: async (req: FastifyRequest<EmptyAuthRequest>, reply: FastifyReply): Promise<void> => 
			await watchedController.getWatched(req, reply, server),
		schema: getWatchedSchema
	});

};

export default fp(asyncRoutes);
