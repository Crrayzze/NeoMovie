import { FastifySchema } from "fastify";

export const postWatchedSchema: FastifySchema = {
	description: "Function to create a new watched movie",
	tags: ["Watched"],
	summary: "Function to create a new watched movie\n\nAuthorization required",
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

export const getWatchedSchema: FastifySchema = {
	description: "Function to get all your watched movies",
	tags: ["Watched"],
	summary: "Function to get all your watched movies\n\nAuthorization required",
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
					release_date: { type: "string"},
					genre_ids: { 
						type: "array",
						items: {
							type: "number"
						}
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
