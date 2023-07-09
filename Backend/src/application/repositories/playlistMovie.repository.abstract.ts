import { PlaylistModel } from "adapters/spi/db/models/playlist.model";
import { PlaylistMovieEntity } from "domain/entities/playlistMovie.entity";

export interface AbstractPlaylistMovieRepository {
	create(playlistEntity: PlaylistMovieEntity): Promise<void>;
	delete(id: string): Promise<void>;
	getByPlaylistId(playlist: PlaylistModel): Promise<PlaylistMovieEntity[]>;
	getByPlaylistMovie(playlist: PlaylistModel, newMovie: PlaylistMovieEntity): Promise<boolean>;
}
