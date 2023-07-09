export interface AbstractTmdbRepository {
	getMovieGenre(): Promise<any>;
	searchMoviesByGenre(genreId: string): Promise<any>;
	getMovieById(id: string): Promise<any>;
	getTrendingDay(): Promise<any>;
	getTrendingWeek(): Promise<any>;
	getPopular(): Promise<any>;
	discoverFromNetflix(): Promise<any>;
	searchByName(name: string): Promise<any>;
}
