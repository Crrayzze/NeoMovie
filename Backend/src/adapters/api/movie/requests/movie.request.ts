import { UserEntity } from "domain/entities/user.entity";

export interface PostDetailsMovieRequest {
	Body: {
	};
}

export interface EmptyAuthRequest {
	Body: {
		authUser: UserEntity;
	};
}

export interface GetMovieByGenreRequest {
	Querystring: {
		genre_id: string;
	};
}

export interface GetMovieByNameRequest {
	Querystring: {
		name: string;
	};
}

