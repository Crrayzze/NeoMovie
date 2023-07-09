import { FastifySchema } from "fastify";

export const postPlaylistSchema: FastifySchema = {
	description: "Function to create a new playlist",
	tags: ["Playlist"],
	summary: "Function to create a new playlist\n\nAuthorization required",
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

export const getPlaylistSchema: FastifySchema = {
	description: "Function to get your all playlists",
	tags: ["Playlist"],
	summary: "unction to get your all playlists\n\nAuthorization required",
	response: {
		200: {
			description: "Successful response",
			type: "array",
			items: {
				type: "object",
				properties: {
					id: { type: "string" },
					title: { type: "string" },
					movie: {
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

export const getPlaylistListSchema: FastifySchema = {
	description: "Function to get the name of all your playlists",
	tags: ["Playlist"],
	summary: "Function to get the name of all your playlists\n\nAuthorization required",
	response: {
		200: {
			description: "Successful response",
			type: "array",
			items: {
				type: "object",
				properties: {
					id: { type: "string" },
					title: { type: "string" }
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

export const postMoviePlaylistSchema: FastifySchema = {
	description: "Function to add a movie to a playlist",
	tags: ["Playlist"],
	summary: "Function to add a movie to a playlist\nAuthorization required",
	body: {
		type: "object",
		required: ["playlist_id", "movie_id"],
		properties: {
			playlist_id: { type: "string" },
			movie_id: { type: "string" }
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

export const deleteMoviePlaylistSchema: FastifySchema = {
	description: "Function to delete a movie from a playlist",
	tags: ["Playlist"],
	summary: "Function to delete a movie from a playlist\nAuthorization required",
	body: {
		type: "object",
		required: ["playlist_movie_id"],
		properties: {
			playlist_movie_id: { type: "string" }
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
