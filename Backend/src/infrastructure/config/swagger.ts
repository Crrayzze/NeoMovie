import { SwaggerOptions } from "fastify-swagger";

export const swaggerOptions: SwaggerOptions = {
	routePrefix: "/documentation",
	exposeRoute: true,
	swagger: {
		info: {
			title: "NeoMovie API",
			description: "Desciption",
			version: "1.0.0"
		},
		host: "localhost",
		schemes: ["http"],
		consumes: ["application/json"],
		produces: ["application/json"]
	}
};
