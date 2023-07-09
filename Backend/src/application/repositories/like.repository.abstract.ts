import { LikeEntity } from "domain/entities/like.entity";
import { UserModel } from "adapters/spi/db/models/user.model";

export interface AbstractLikeRepository {
	create(entity: LikeEntity): Promise<void>;
	get(user: UserModel): Promise<LikeEntity[]>;
	getByUserMovie(user: UserModel, like: LikeEntity): Promise<boolean>;
}
