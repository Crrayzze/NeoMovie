import { FastifySchema } from "fastify";

export const getMovieGenreSchema: FastifySchema = {
	description: "Function to fetch all movie genre",
	tags: ["Movie"],
	summary: "Function to fetch all movie genre\n\nAuthorization required",
	response: {
		200: {
			description: "Successful response",
			type: "object",
			properties: {
				genres: {
					type: "array",
					items: {
						type: "object",
						properties: {
							id: { type: "number" },
							name: { type: "string" }
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



export const getMovieTrendingDaySchema: FastifySchema = {
	description: "Function to fetch a movie list by trending day",
	tags: ["Movie"],
	summary: "Function to fetch a movie list by trending daye\n\nAuthorization required",
	response: {
		200: {
			description: "Successful response",
			type: "array",
			items: {
				type: "object",
				properties: {
					id: { type: "number" },
					overview: { type: "string" },
					poster_path: { type: "string" },
					title: { type: "string" },
					vote_average: { type: "number" },
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

export const getMovieTrendingWeekSchema: FastifySchema = {
	description: "Function to fetch a movie list by trending week",
	tags: ["Movie"],
	summary: "Function to fetch a movie list by trending week\n\nAuthorization required",
	response: {
		200: {
			description: "Successful response",
			type: "array",
			items: {
				type: "object",
				properties: {
					id: { type: "number" },
					overview: { type: "string" },
					poster_path: { type: "string" },
					title: { type: "string" },
					vote_average: { type: "number" },
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

export const getMoviePopularSchema: FastifySchema = {
	description: "Function to fetch a popular movie list",
	tags: ["Movie"],
	summary: "Function to fetch a popular movie list\n\nAuthorization required",
	response: {
		200: {
			description: "Successful response",
			type: "array",
			items: {
				type: "object",
				properties: {
					id: { type: "number" },
					overview: { type: "string" },
					poster_path: { type: "string" },
					title: { type: "string" },
					vote_average: { type: "number" },
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

export const getDiscoverSchema: FastifySchema = {
	description: "Function to fetch a discovery movie list",
	tags: ["Movie"],
	summary: "Function to fetch a discovery movie list\n\nAuthorization required",
	response: {
		200: {
			description: "Successful response",
			type: "array",
			items: {
				type: "object",
				properties: {
					id: { type: "number" },
					overview: { type: "string" },
					poster_path: { type: "string" },
					title: { type: "string" },
					vote_average: { type: "number" },
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


export const getMovieByGenreSchema: FastifySchema = {
	description: "Function to fetch a movie list by genre",
	tags: ["Movie"],
	summary: "Function to fetch a movie list by genre\n\nAuthorization required",
	querystring: {
		genre_id: { type: "string" }
	},
	response: {
		200: {
			description: "Successful response",
			type: "array",
			items: {
				type: "object",
				properties: {
					id: { type: "number" },
					overview: { type: "string" },
					poster_path: { type: "string" },
					title: { type: "string" },
					vote_average: { type: "number" },
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

export const getMovieByNameSchema: FastifySchema = {
	description: "Function to fetch a movie list by name",
	tags: ["Movie"],
	summary: "Function to fetch a movie list by name\n\nAuthorization required",
	querystring: {
		name_id: { type: "string" }
	},
	response: {
		200: {
			description: "Successful response",
			type: "array",
			items: {
				type: "object",
				properties: {
					id: { type: "number" },
					overview: { type: "string" },
					poster_path: { type: "string" },
					title: { type: "string" },
					vote_average: { type: "number" },
					backdrop_path: { type: "string" },
					release_date: { type: "string" },
					video: { type: "boolean" },
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

export const getMovieByUserGenreSchema: FastifySchema = {
	description: "Function to fetch a movie list for every favourite genre of a user",
	tags: ["Movie"],
	summary: "Function to fetch a movie list for every favourite genre of a user\n\nAuthorization required",

	response: {
		200: {
			description: "Successful response",
			type: "object",
			properties: {
				genre: { type: "string" },
				movies: { 
					type: "array",
					items: {
						type: "object",
						properties: {
							id: { type: "number" },
							overview: { type: "string" },
							poster_path: { type: "string" },
							title: { type: "string" },
							vote_average: { type: "number" },
							backdrop_path: { type: "string" },
							release_date: { type: "string" },
							video: { type: "boolean" },
							genre_ids: { 
								type: "array",
								items: {
									type: "number"
								}
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

