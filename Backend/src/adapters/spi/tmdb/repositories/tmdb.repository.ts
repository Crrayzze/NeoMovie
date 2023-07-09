/* eslint-disable @typescript-eslint/typedef */
import MovieDB = require("node-themoviedb");

import { AbstractTmdbRepository } from "application/repositories/tmdb.repository.abstract";
import { GenericError } from "domain/errors/generic.error.entity";

export class TmdbRepository implements AbstractTmdbRepository {
	private movieDb: MovieDB;

	constructor(movieDb: MovieDB) {
		this.movieDb = movieDb;
	}

	async getMovieGenre(): Promise<any> {
		try {
			const genres = await this.movieDb.genre.getMovieList();
			return genres;
		} catch (e) {
			console.log(e);
			throw new GenericError("Cannot fetch movie genre");
		}
	}

	async searchMoviesByGenre(genreId: string): Promise<any> {
		try {
			const movies = await this.movieDb.discover.movie({
				query: {
					with_genres: genreId,
					sort_by: "vote_count.asc",
					"vote_count.gte": 10000,
					include_video: true
				}
			});
			return movies;
		} catch (e) {
			console.log(e);
			throw new GenericError("Cannot fetch movies by genre");
		}
	}

	async getMovieById(id: string): Promise<any> {
		try {
			const args = {
				pathParameters: {
					movie_id: id
				}
			};
			const movie = await this.movieDb.movie.getDetails(args);

			return movie.data;
		} catch (e) {
			console.log(e);
			throw new GenericError("Cannot fetch movies by id");
		}
	}

	async getTrendingDay(): Promise<any> {
		try {
			const movie = await this.movieDb.trending.getTrending({pathParameters:{media_type:"movie", time_window:"day"}});
			return movie.data;
		} catch (e) {
			console.log(e);
			throw new GenericError("Cannot fetch trending movies");
		}
	}

	async getTrendingWeek(): Promise<any> {
		try {
			const movie = await this.movieDb.trending.getTrending({pathParameters:{media_type:"movie", time_window:"week"}});
			return movie.data;
		} catch (e) {
			console.log(e);
			throw new GenericError("Cannot fetch trending movies");
		}
	}

	async getPopular(): Promise<any> {
		try {
			const movie = await this.movieDb.movie.getPopular({});
			return movie.data;
		} catch (e) {
			console.log(e);
			throw new GenericError("Cannot fetch popular movies");
		}
	}

	async discoverFromNetflix(): Promise<any> {
		try {
			const movie = await this.movieDb.discover.tv({
				query: {
					with_networks: "213"
				}});
			return movie.data;
		} catch (e) {
			console.log(e);
			throw new GenericError("Cannot fetch discover movies");
		}
	}

	async searchByName(name: string): Promise<any> {
		try {
			const movies = await this.movieDb.search.movies({
				query: {
					query: name
				}
			});
			return movies.data;
		} catch (e) {
			console.log(e);
			throw new GenericError("Cannot fetch movies by genre");
		}
	}

}
