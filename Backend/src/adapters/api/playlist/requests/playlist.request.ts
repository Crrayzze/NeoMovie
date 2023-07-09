import { AuthenticatedRequest } from "adapters/api/authentication/requests/authenticated.request";
import { UserEntity } from "domain/entities/user.entity";

export interface PostPlaylistRequest extends AuthenticatedRequest {
	Body: {
		authUser: UserEntity;
		title: string;
	};
}

export interface PostMovieRequest extends AuthenticatedRequest {
	Body: {
		authUser: UserEntity;
		movie_id: string;
		playlist_id: string;
	};
}

export interface DeleteMovieRequest extends AuthenticatedRequest {
	Body: {
		authUser: UserEntity;
		playlist_movie_id: string;
	};
}


export interface EmptyRequest {
	Body: {
	};
}
