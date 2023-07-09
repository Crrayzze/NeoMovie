import { UserModel } from "adapters/spi/db/models/user.model";
import { PlaylistEntity } from "domain/entities/playlist.entities";

export interface AbstractPlaylistRepository {
	create(playlistEntity: PlaylistEntity): Promise<void>;
	getById(id: string): Promise<PlaylistEntity>;
	getAll(id: UserModel): Promise<PlaylistEntity[]>;
}
