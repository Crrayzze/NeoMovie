import { FastifySchema } from "fastify";

export const postFavouriteGenreSchema: FastifySchema = {
	description: "Function to add new favourite genre",
	tags: ["Genre"],
	summary: "Function to add new favourite genre\n\nAuthorization required",
	body: {
		type: "object",
		properties: {
			genres_id: {
				type: "array",
				items: {
					type: "string"
				}
			}
		}
	},
	response: {
		200: {
			description: "Successful response",
			type: "object",
			properties: {
				message: { type: "string" }
			}
		},
		400: {
			description: "Application Error",
			type: "object",
			properties: {
				message: { type: "string" }
			}
		},
		401: {
			description: "Authentication failed",
			type: "object",
			properties: {
				message: { type: "string" }
			}
		}
	}
};

export const getFavouriteGenreSchema: FastifySchema = {
	description: "Function to get favourite genre",
	tags: ["Genre"],
	summary: "Function to get favourite genre\n\nAuthorization required",

	response: {
		200: {
			description: "Successful response",
			type: "object",
			properties: {
				genres_id: {
					type: "array",
					items: {
						type: "string"
					}
				}
				
			}
		},
		400: {
			description: "Application Error",
			type: "object",
			properties: {
				message: { type: "string" }
			}
		},
		401: {
			description: "Authentication failed",
			type: "object",
			properties: {
				message: { type: "string" }
			}
		}
	}
};
