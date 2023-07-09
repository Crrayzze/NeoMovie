import fp from "fastify-plugin";

import { FastifyReply, FastifyInstance, FastifyPluginAsync, FastifyRequest } from "fastify";
import middleware from "adapters/api/authentication/middlewares/authentication.middleware";
import { postLikeSchema, getLikeSchema } from "../schemas/like.schema";
import { PostLikeRequest, EmptyAuthRequest } from "../requests/like.request";

import likeController from "../controllers/like.controller";

// eslint-disable-next-line @typescript-eslint/require-await
const asyncRoutes: FastifyPluginAsync = async (server: FastifyInstance): Promise<void> => {
	const BASE_URL: string = "/api/like";

	server.route({
		method: "POST",
		url: `${BASE_URL}`,
		preValidation: async (req: FastifyRequest, reply: FastifyReply): Promise<void> => await middleware.validAuth(req, reply, server),
		handler: async (req: FastifyRequest<PostLikeRequest>, reply: FastifyReply): Promise<void> => 
			await likeController.postLike(req, reply, server),
		schema: postLikeSchema
	});

	server.route({
		method: "GET",
		url: `${BASE_URL}`,
		preValidation: async (req: FastifyRequest, reply: FastifyReply): Promise<void> => await middleware.validAuth(req, reply, server),
		handler: async (req: FastifyRequest<EmptyAuthRequest>, reply: FastifyReply): Promise<void> => 
			await likeController.getLike(req, reply, server),
		schema: getLikeSchema
	});

};

export default fp(asyncRoutes);
