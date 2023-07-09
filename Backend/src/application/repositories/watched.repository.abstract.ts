import { WatchedEntity } from "domain/entities/watched.entity";
import { UserModel } from "adapters/spi/db/models/user.model";

export interface AbstractWatchedRepository {
	create(entity: WatchedEntity): Promise<void>;
	get(user: UserModel): Promise<WatchedEntity[]>;
	getByUserMovie(user: UserModel, watched: WatchedEntity): Promise<boolean>;
}
