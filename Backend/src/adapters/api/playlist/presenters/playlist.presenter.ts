import { BasePresenter } from "domain/presenters/base.presenter";
import { MoviePresenter } from "./movie.presenter";

export interface PlaylistPresenter extends BasePresenter {
	title: string;
	movie: MoviePresenter[];
}
