import { HttpAuth } from "adapters/spi/shared/utils/httpAuth";
import { Connection } from "typeorm";
import MovieDB = require("node-themoviedb");

import { AbstractAuthenticationRepository } from "application/repositories/authentication.repository.abstract";
import { AbstractPlaylistRepository } from "application/repositories/playlist.repository.abstract";
import { AbstractTmdbRepository } from "application/repositories/tmdb.repository.abstract";
import { AbstractPlaylistMovieRepository } from "application/repositories/playlistMovie.repository.abstract";
import { AbstractLikeRepository } from "application/repositories/like.repository.abstract";
import { AbstractWatchedRepository } from "application/repositories/watched.repository.abstract";
import { AbstractUserGenreRepository } from "application/repositories/userGenre.repository.abstract";


declare module "fastify" {
	export interface FastifyInstance {
		httpClient: HttpAuth;
		orm: Connection;
		movieDB: MovieDB;

		authenticationRepository: AbstractAuthenticationRepository;
		playlistRepository: AbstractPlaylistRepository;
		playlistMovieRepository: AbstractPlaylistMovieRepository;
		likeRepository: AbstractLikeRepository;
		watchedRepository: AbstractWatchedRepository;
		userGenreRepository: AbstractUserGenreRepository;


		tmdbRepository: AbstractTmdbRepository;
	}
}
