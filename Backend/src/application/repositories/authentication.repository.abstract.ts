import { UserEntity } from "domain/entities/user.entity";

export interface AbstractAuthenticationRepository {
	createAccount(user: UserEntity): Promise<UserEntity>;
	login(user: UserEntity): Promise<UserEntity>;
	middleware(token: string): Promise<UserEntity>;
}
