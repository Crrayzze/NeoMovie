import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

import { ErrorHandling } from "adapters/api/errorHandling/utils/errorHandling.utils";

import { PostRegisterAuthenticationRequest, PostLoginAuthenticationRequest } from "adapters/api/authentication/requests/authentication.request";
import { GenericResponsePresenter } from "adapters/api/authentication/presenters/genericResponse.authentication.presenter";
import { UserRegisterApiMapper } from "adapters/api/authentication/mappers/userRegister.authentication.mapper";
import { GenericResponseApiMapper } from "adapters/api/authentication/mappers/userRegisterResponse.authentication.mapper";


import { UserEntity } from "domain/entities/user.entity";
import { GenericResponseEntity } from "domain/entities/genericResponse.entity";

import { RegisterUserUseCase } from "application/useCases/authentication/register.authentication.usecase";
import { UserLoginApiMapper } from "../mappers/userLogin.authentication.mapper";
import { LoginUserUseCase } from "application/useCases/authentication/login.authentication.usecase";
import { LogginResponseApiMapper } from "../mappers/userLoginResponse.authentication.mapper";
import { LoginResponsePresenter } from "../presenters/loginResponse.authentication.presenter";

const postRegisterAuthentication = async (req: FastifyRequest<PostRegisterAuthenticationRequest>, reply: FastifyReply, server: FastifyInstance): Promise<void> => {
	try {
		const userRegisterApiMapper: UserRegisterApiMapper = new UserRegisterApiMapper();
		const userEntity: UserEntity = userRegisterApiMapper.toEntity(req.body);

		const registerUseCase: RegisterUserUseCase = new RegisterUserUseCase(userEntity, server.authenticationRepository);
		const genericResponseEntity: GenericResponseEntity = await registerUseCase.execute();

		const genericResponseApiMapper: GenericResponseApiMapper = new GenericResponseApiMapper();
		const genericResponsePresenter: GenericResponsePresenter = genericResponseApiMapper.toApi(genericResponseEntity);
		
		void reply.send(genericResponsePresenter);
	} catch (err) {
		console.log(err);
		throw ErrorHandling.createApplicationError(err, "An unknown error occurred while trying to register, please try again");
	}
};

const postLoginAuthentication = async (req: FastifyRequest<PostLoginAuthenticationRequest>, reply: FastifyReply, server: FastifyInstance): Promise<void> => {
	try {
		const userLoginApiMapper: UserLoginApiMapper = new UserLoginApiMapper();
		const userEntity: UserEntity = userLoginApiMapper.toEntity(req.body);

		const loginUserUseCase: LoginUserUseCase = new LoginUserUseCase(userEntity, server.authenticationRepository);
		const connectedUserEntity: UserEntity = await loginUserUseCase.execute();
		
		const logginResponseApiMapper: LogginResponseApiMapper = new LogginResponseApiMapper();
		const loginResponsePresenter: LoginResponsePresenter = logginResponseApiMapper.toApi(connectedUserEntity);

		void reply.send(loginResponsePresenter);
	} catch (err) {
		throw ErrorHandling.createApplicationError(err, "An unknown error occurred while trying to login, please try again");
	}
};


export default { postRegisterAuthentication, postLoginAuthentication };
