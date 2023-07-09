import { Response } from "light-my-request";
import { describe, it } from "mocha";
import { TestRequestUtils } from "../utils/request.utils";
import { TestResponseUtils } from "../utils/response.utils";
import { expect } from "chai";

describe("Movie API:", () => {
	const urlMovie: string = "/api/movie";

	const urlGetGenre: string = "/genre";
	const urlSearchByGenre: string =  "/search/genre";

	describe("GetGenre", () => {
		it("it should return a 400 if the user isn't logged in", async () => {
			// given
			const url: string = `${urlMovie}${urlGetGenre}`;

			// when
			const response: Response = await TestRequestUtils.getRequest(url, "falseToken");

			// then
			TestResponseUtils.checkResponseGenericError(response);
		});


		it("it should return a 200 when getting all genre", async () => {
			// given
			const url: string = `${urlMovie}${urlGetGenre}`;
			const token: string = await TestRequestUtils.getAuthenticatedUser(1);

			// when
			const response: Response = await TestRequestUtils.getRequest(url, token);

			// then
			TestResponseUtils.checkResponseOk(response);
		});
	});

	describe("Search Movie By Genre", () => {
		it("it should return a 400 if the user isn't logged in", async () => {
			// given
			const url: string = `${urlMovie}${urlSearchByGenre}`;

			// when
			const response: Response = await TestRequestUtils.getRequest(url, "falseToken");

			// then
			TestResponseUtils.checkResponseGenericError(response);
		});

		it("it should return a 200 when getting all genre (big response)", async () => {
			// given
			const url: string = `${urlMovie}${urlSearchByGenre}?genre_id=28`;
			const token: string = await TestRequestUtils.getAuthenticatedUser(1);

			// when
			const response: Response = await TestRequestUtils.getRequest(url, token);

			// then
			TestResponseUtils.checkResponseOk(response);
		});

		it("it should return a 200 when getting all genre (small response)", async () => {
			// given
			const url: string = `${urlMovie}${urlSearchByGenre}?genre_id=99`;
			const token: string = await TestRequestUtils.getAuthenticatedUser(1);

			// when
			const response: Response = await TestRequestUtils.getRequest(url, token);

			// then
			TestResponseUtils.checkResponseOk(response);
		});
	});

});
