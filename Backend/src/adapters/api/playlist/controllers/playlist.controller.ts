import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

import { ErrorHandling } from "adapters/api/errorHandling/utils/errorHandling.utils";

import { PostPlaylistRequest, PostMovieRequest, DeleteMovieRequest } from "../requests/playlist.request";

import { CreatePlaylistUseCase } from "application/useCases/playlist/create.playlist.usecase";
import { PlaylistEntity } from "domain/entities/playlist.entities";
import { CreatePlaylistApiMapper } from "../mappers/createPlaylist.mapper";
import { PlaylistMovieEntity } from "domain/entities/playlistMovie.entity";
import { GetPlaylistByIdUseCase } from "application/useCases/playlist/getById.playlist.usecase";
import { PostMoviePlaylistUseCase } from "application/useCases/playlist/postMovie.playlist.usecase";
import { DeleteMoviePlaylistUseCase } from "application/useCases/playlist/deleteMovie.playlist.usecase";
import { EmptyAuthRequest } from "adapters/api/movie/requests/movie.request";
import { GetPlaylistUseCase } from "application/useCases/playlist/get.playlist.usecase";
import { EntirePlaylistMovieEntity } from "domain/entities/entirePlaylist.entity";
import { GetByPlaylistIdsUseCase } from "application/useCases/playlist/getByPlaylistIds.usecase";
import { GetMovieDataFillPlaylistUseCase } from "application/useCases/playlist/getMovieData.playlist.usecase";
import { PlaylistApiMapper } from "../mappers/playlist.mapper";
import { PlaylistPresenter } from "../presenters/playlist.presenter";
import { PlaylistListApiMapper } from "../mappers/playlistList.mapper";

const postPlaylist = async (req: FastifyRequest<PostPlaylistRequest>, reply: FastifyReply, server: FastifyInstance): Promise<void> => {
	try {
		const createPlaylistApiMapper: CreatePlaylistApiMapper = new CreatePlaylistApiMapper();
		const playlistEntity: PlaylistEntity = createPlaylistApiMapper.toEntity(req.body);
		playlistEntity.user = req.body.authUser;

		const createPlaylistUseCase: CreatePlaylistUseCase = new CreatePlaylistUseCase(server.playlistRepository, playlistEntity);
		await createPlaylistUseCase.execute();

		void reply.send({ message: "Playlist created" });
	} catch (err) {
		console.log(err);
		throw ErrorHandling.createApplicationError(err, "An unknown error occurred while trying to create a new playlist, please try again");
	}
};

const getPlaylistList = async (req: FastifyRequest<EmptyAuthRequest>, reply: FastifyReply, server: FastifyInstance): Promise<void> => {
	try {
		const getPlaylistUseCase: GetPlaylistUseCase = new GetPlaylistUseCase(server.playlistRepository, req.body.authUser);
		const playlistEntities: PlaylistEntity[] =  await getPlaylistUseCase.execute();

		const playlistListApiMapper: PlaylistListApiMapper = new PlaylistListApiMapper();
		const playlistPresenters: PlaylistPresenter[] = [];

		for (const playlist of playlistEntities) {
			playlistPresenters.push(playlistListApiMapper.toApi(playlist));
		}
		void reply.send(playlistPresenters);
	} catch (err) {
		console.log(err);
		throw ErrorHandling.createApplicationError(err, "An unknown error occurred while trying to get your playlists, please try again");
	}
};


const getPlaylist = async (req: FastifyRequest<EmptyAuthRequest>, reply: FastifyReply, server: FastifyInstance): Promise<void> => {
	try {
		// 1-get ids of all playlist that belong to the user connected
		const getPlaylistUseCase: GetPlaylistUseCase = new GetPlaylistUseCase(server.playlistRepository, req.body.authUser);
		const playlistEntities: PlaylistEntity[] =  await getPlaylistUseCase.execute();


		// 2-find all playlistMovies according to every ids and build the object dynamicaly
		const getByPlaylistIdsUseCase: GetByPlaylistIdsUseCase = new GetByPlaylistIdsUseCase(server.playlistMovieRepository, playlistEntities);
		let entirePlaylistMovieEntities: EntirePlaylistMovieEntity[] = await getByPlaylistIdsUseCase.execute();


		// 3-get the movie data from tmdb while putting it in the object (not every value)
		const getMovieDataFillPlaylistUseCase: GetMovieDataFillPlaylistUseCase = new GetMovieDataFillPlaylistUseCase(server.tmdbRepository, entirePlaylistMovieEntities);
		entirePlaylistMovieEntities = await getMovieDataFillPlaylistUseCase.execute();

		// 4-do a presenter to send back this data
		const playlistApiMapper: PlaylistApiMapper = new PlaylistApiMapper();
		const playlistPresenters: PlaylistPresenter[] = [];

		for (const playlist of entirePlaylistMovieEntities) {
			playlistPresenters.push(playlistApiMapper.toApi(playlist));
		}
		void reply.send(playlistPresenters);
	} catch (err) {
		console.log(err);
		throw ErrorHandling.createApplicationError(err, "An unknown error occurred while trying to get your playlists, please try again");
	}
};

const postMovie = async (req: FastifyRequest<PostMovieRequest>, reply: FastifyReply, server: FastifyInstance): Promise<void> => {
	try {
		// get Playlist by id
		const getPlaylistByIdUseCase: GetPlaylistByIdUseCase = new GetPlaylistByIdUseCase(server.playlistRepository, req.body.playlist_id);
		const playlistEntity: PlaylistEntity = await getPlaylistByIdUseCase.execute();

		const playlistMovieEntity: PlaylistMovieEntity = { playlist: playlistEntity, movieId: req.body.movie_id };

		const postMoviePlaylistUseCase: PostMoviePlaylistUseCase = new PostMoviePlaylistUseCase(server.playlistMovieRepository, playlistMovieEntity);
		await postMoviePlaylistUseCase.execute();

		void reply.send({ message: "Movie added to the playlist" });
	} catch (err) {
		console.log(err);
		throw ErrorHandling.createApplicationError(err, "An unknown error occurred while trying to add a movie to a playlist, please try again");
	}
};

const deleteMovie = async (req: FastifyRequest<DeleteMovieRequest>, reply: FastifyReply, server: FastifyInstance): Promise<void> => {
	try {
		const deleteMoviePlaylistUseCase: DeleteMoviePlaylistUseCase = new DeleteMoviePlaylistUseCase(server.playlistMovieRepository, req.body.playlist_movie_id);
		await deleteMoviePlaylistUseCase.execute();
		
		void reply.send({ message: "Movie removed from the playlist" });
	} catch (err) {
		console.log(err);
		throw ErrorHandling.createApplicationError(err, "An unknown error occurred while trying to add a movie to a playlist, please try again");
	}
};

export default { postPlaylist, getPlaylist, postMovie, deleteMovie, getPlaylistList };
