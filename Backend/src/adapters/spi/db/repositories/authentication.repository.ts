import { EntityManager } from "typeorm";

import { UserMapper } from "adapters/spi/db/mappers/user.mapper";
import { UserModel } from "adapters/spi/db/models/user.model";

import { AbstractAuthenticationRepository } from "application/repositories/authentication.repository.abstract";
import { DbMapper } from "application/mappers/db.mapper";

import { UserEntity } from "domain/entities/user.entity";
import { GenericError } from "domain/errors/generic.error.entity";

export class AuthenticationRepository implements AbstractAuthenticationRepository {
	private entityManager: EntityManager;
	private mapper: DbMapper<UserEntity, UserModel>;

	constructor(entityManager: EntityManager) {
		this.entityManager = entityManager;
		this.mapper = new UserMapper();
	}

	async createAccount(user: UserEntity): Promise<UserEntity> {
		try {
			const data: UserModel = await this.entityManager.save(this.mapper.toModel(user));
			return this.mapper.toEntity(data);
		} catch {
			throw new GenericError("Account not created");
		}
	}

	async login(user: UserEntity): Promise<UserEntity> {
		try {
			const userModel: UserModel = await this.entityManager.getRepository(UserModel).findOneOrFail({ username: user.username, password: user.password });
			const userEntity: UserEntity = this.mapper.toEntity(userModel);
			userEntity.token = this.generateToken();
			const data: UserModel = await this.entityManager.save(this.mapper.toModel(userEntity));
			return this.mapper.toEntity(data);
		} catch {
			throw new GenericError("Wrong username or password");
		}
	}

	async middleware(token: string): Promise<UserEntity> {
		try {
			const userModel: UserModel = await this.entityManager.getRepository(UserModel).findOneOrFail({ token });
			return this.mapper.toEntity(userModel);
		} catch {
			throw new GenericError("Something went wrong while finding the associated user");
		}
	}

	private generateToken(): string {
		let token: string = "";
		const possible: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

		for (let i: number = 0; i < 20; i++)
		    {token += possible.charAt(Math.floor(Math.random() * possible.length));}
		return token;
	}

}
