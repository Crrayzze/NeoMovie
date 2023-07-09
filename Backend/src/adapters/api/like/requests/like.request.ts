import { AuthenticatedRequest } from "adapters/api/authentication/requests/authenticated.request";
import { UserEntity } from "domain/entities/user.entity";

export interface PostLikeRequest extends AuthenticatedRequest {
	Body: {
		authUser: UserEntity;
		movieId: string;
	};
}

export interface EmptyAuthRequest {
	Body: {
		authUser: UserEntity;
	};
}


export interface EmptyRequest {
	Body: {
	};
}
