import { AuthenticatedRequest } from "adapters/api/authentication/requests/authenticated.request";
import { UserEntity } from "domain/entities/user.entity";


export interface PostFavouriteGenreRequest extends AuthenticatedRequest {
	Body: {
		authUser: UserEntity;
		genres_id: string[];
		
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
