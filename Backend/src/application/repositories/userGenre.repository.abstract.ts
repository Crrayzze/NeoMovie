import { UserModel } from "adapters/spi/db/models/user.model";
import { UserGenreEntity } from "domain/entities/userGenre.entity";

export interface AbstractUserGenreRepository {
	create(userGenre: UserGenreEntity): Promise<void>;
	getByUserId(userModel: UserModel): Promise<string[]>;
}
