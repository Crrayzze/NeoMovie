import fp from "fastify-plugin";

import { FastifyReply, FastifyInstance, FastifyPluginAsync, FastifyRequest } from "fastify";
import { postRegisterAuthSchema, postLoginAuthSchema } from "adapters/api/authentication/schemas/authentication.schema";
import { PostRegisterAuthenticationRequest, PostLoginAuthenticationRequest } from "adapters/api/authentication/requests/authentication.request";

import authenticationController from "adapters/api/authentication/controllers/authentication.controller";

// eslint-disable-next-line @typescript-eslint/require-await
const asyncRoutes: FastifyPluginAsync = async (server: FastifyInstance): Promise<void> => {
	const BASE_URL: string = "/api/authentication";

	server.route({
		method: "POST",
		url: `${BASE_URL}/register`,
		handler: async (req: FastifyRequest<PostRegisterAuthenticationRequest>, reply: FastifyReply): Promise<void> => 
			await authenticationController.postRegisterAuthentication(req, reply, server),
		schema: postRegisterAuthSchema
	});

	server.route({
		method: "POST",
		url: `${BASE_URL}/login`,
		handler: async (req: FastifyRequest<PostLoginAuthenticationRequest>, reply: FastifyReply): Promise<void> => 
			await authenticationController.postLoginAuthentication(req, reply, server),
		schema: postLoginAuthSchema
	});

};

export default fp(asyncRoutes);
