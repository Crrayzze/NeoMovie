export interface PostRegisterAuthenticationRequest {
	Body: {
		username: string;
		password: string;
	};
}

export interface PostLoginAuthenticationRequest {
	Body: {
		username: string;
		password: string;
	};
}
