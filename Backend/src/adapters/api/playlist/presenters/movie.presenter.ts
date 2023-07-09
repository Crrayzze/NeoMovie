import { BasePresenter } from "domain/presenters/base.presenter";

export interface MoviePresenter extends BasePresenter {
	overview: string;
	poster_path: string;
	title: string;
	vote_average: string;
	backdrop_path: string;
	release_date: string;
	video: boolean;
}
