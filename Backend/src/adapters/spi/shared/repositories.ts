import fp from "fastify-plugin";
import { FastifyError, FastifyInstance } from "fastify";
import "reflect-metadata";

import { AuthenticationRepository } from "../db/repositories/authentication.repository";
import { PlaylistRepository } from "../db/repositories/playlist.repository";
import { TmdbRepository } from "../tmdb/repositories/tmdb.repository";
import { PlaylistMovieRepository } from "../db/repositories/playlistMovie.repository";
import { LikeRepository } from "../db/repositories/like.repository";
import { WatchedRepository } from "../db/repositories/watched.repository";
import { UserGenreRepository } from "../db/repositories/userGenre.repository";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default fp((server: FastifyInstance, opts: any, next: (err?: FastifyError) => void): void => {
	try {

		const authenticationRepository: AuthenticationRepository = new AuthenticationRepository(server.orm.manager);
		server.decorate("authenticationRepository", authenticationRepository);

		const playlistRepository: PlaylistRepository = new PlaylistRepository(server.orm.manager);		
		server.decorate("playlistRepository", playlistRepository);

		const playlistMovieRepository: PlaylistMovieRepository = new PlaylistMovieRepository(server.orm.manager);		
		server.decorate("playlistMovieRepository", playlistMovieRepository);

		const likeRepository: LikeRepository = new LikeRepository(server.orm.manager);	
		server.decorate("likeRepository", likeRepository);

		const watchedRepository: WatchedRepository = new WatchedRepository(server.orm.manager);	
		server.decorate("watchedRepository", watchedRepository);

		const userGenreRepository: UserGenreRepository = new UserGenreRepository(server.orm.manager);	
		server.decorate("userGenreRepository", userGenreRepository);

		const tmdbRepository: TmdbRepository = new TmdbRepository(server.movieDB);
		server.decorate("tmdbRepository", tmdbRepository);

		return next();
	} catch (err) {
		console.error(err);
		return next(err);
	}
});
