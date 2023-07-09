import { FastifySchema } from "fastify";

export const postLikeSchema: FastifySchema = {
	description: "Function to create a new like",
	tags: ["Playlist"],
	summary: "Function to create a new like\n\nAuthorization required",
	body: {
		type: "object",
		properties: {
			movieId: { type: "string" }
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

export const getLikeSchema: FastifySchema = {
	description: "Function to get your all liked movies",
	tags: ["Like"],
	summary: "Function to get your all liked movies\n\nAuthorization required",
	response: {
		200: {
			description: "Successful response",
			type: "array",
			items: {
				type: "object",
				properties: {
					id: { type: "string" },
					title: { type: "string" },
					overview: { type: "string" },
					vote_average: { type: "string" },
					poster_path: { type: "string" },
					backdrop_path: { type: "string" },
					release_date: { type: "string" },
					video: { type: "boolean" }
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
