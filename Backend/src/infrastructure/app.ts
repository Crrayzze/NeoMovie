import fastify, { FastifyInstance } from "fastify";
import swagger from "fastify-swagger";
import { Server, IncomingMessage, ServerResponse } from "http";
import fastifyEnv from "fastify-env";
import fastifyCors from "fastify-cors";
import fastifyStatic from "fastify-static";

import path = require("path");
import { swaggerOptions } from "infrastructure/config/swagger";
import { envOptions } from "infrastructure/config/environment";
import db from "infrastructure/spi/db";

import { HttpAuth } from "adapters/spi/shared/utils/httpAuth";
import MovieDB = require("node-themoviedb");

import repositories from "adapters/spi/shared/repositories";

import errorHandlingRoutes from "adapters/api/errorHandling/routes/errorHandling.routes";
import authenticationRoutes from "adapters/api/authentication/routes/authentication.route";
import movieRoute from "adapters/api/movie/routes/movie.route";
import playlistRoute from "adapters/api/playlist/routes/playlist.route";
import likeRoute from "adapters/api/like/routes/like.route";
import watchedRoute from "adapters/api/watched/routes/watched.route";
import genreRoute from "adapters/api/genre/routes/genre.route";

const env: NodeJS.ProcessEnv = process.env;
const server: FastifyInstance<Server, IncomingMessage, ServerResponse> = fastify({ logger: env.NODE_ENV === "test" ? false : true });

//registering swagger before routes
void server.register(swagger, swaggerOptions);

//registering env specific components
server.register(fastifyEnv, envOptions).after((err: Error): void => {
	if (err) {
		console.error(err);
	}

	//security
	void server.register(fastifyCors, { origin: "*" });

	//db
	void server.register(db, server["config"]);

	//httpClient
	const httpClient: HttpAuth = new HttpAuth();
	server.decorate("httpClient", httpClient);

	// tmdb
	const mdb: MovieDB = new MovieDB("5eb7771ba37739479a2ede56df721ef5", { language: "fr-FR" });
	console.log("Connected to The Movie Database");
	server.decorate("movieDB", mdb);

	//repositories
	void server.register(repositories, server["config"]);

	void server.register(fastifyStatic, {
		root: path.join(path.resolve("public")),
		prefix: "/public/"
	});

	//routes
	void server.register(errorHandlingRoutes, server["config"]);
	void server.register(authenticationRoutes, server["config"]);
	void server.register(movieRoute, server["config"]);
	void server.register(playlistRoute, server["config"]);
	void server.register(likeRoute, server["config"]);
	void server.register(watchedRoute, server["config"]);
	void server.register(genreRoute, server["config"]);

});

export default server;
