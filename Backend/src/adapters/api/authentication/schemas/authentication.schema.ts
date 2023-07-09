import { FastifySchema } from "fastify";

export const postRegisterAuthSchema: FastifySchema = {
	description: "Function to register an user",
	tags: ["Authentication"],
	summary: "Sends a login and password to create a new user",
	body: {
		type: "object",
		required: ["username", "password"],
		properties: {
			username: { type: "string" },
			password: { type: "string" }
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

export const postLoginAuthSchema: FastifySchema = {
	description: "Function to login an user ",
	tags: ["Authentication"],
	summary: "Sends a login and password to login",
	body: {
		type: "object",
		required: ["username", "password"],
		properties: {
			username: { type: "string" },
			password: { type: "string" }
		}
	},
	response: {
		200: {
			description: "Successful response",
			type: "object",
			properties: {
				message: { type: "string" },
				token: { type: "string" },
				firstConnection: { type: "boolean" }
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
