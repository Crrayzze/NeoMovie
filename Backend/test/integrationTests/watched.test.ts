import { Response } from "light-my-request";
import { describe, it } from "mocha";
import { TestRequestUtils } from "../utils/request.utils";
import { TestResponseUtils } from "../utils/response.utils";
import { expect } from "chai";

describe("Movie API:", () => {
	const urlWatched: string = "/api/watched";

	describe("Like a movie", () => {
		it("it should return a 400 if the user isn't logged in", async () => {
			// given
			const url: string = `${urlWatched}`;
			const payload: Record<string, unknown> = { movieId: "14161" };
			// when
			const response: Response = await TestRequestUtils.postRequest(url, payload, "falseToken");

			// then
			TestResponseUtils.checkResponseGenericError(response);
		});

		it("it should return a 200 when the movie has been watched", async () => {
			// given
			const url: string = `${urlWatched}`;
			const payload: Record<string, unknown> = { movieId: "14161" };
			const token: string = await TestRequestUtils.getAuthenticatedUser(1);

			// when
			const response: Response = await TestRequestUtils.postRequest(url, payload, token);

			// then
			TestResponseUtils.checkResponseOk(response);
		});
	});

	describe("Get All Watched Movies", () => {
		it("it should return a 400 if the user isn't logged in", async () => {
			// given
			const url: string = `${urlWatched}`;

			// when
			const response: Response = await TestRequestUtils.getRequest(url, "falseToken");

			// then
			TestResponseUtils.checkResponseGenericError(response);
		});

		it("it should return a 200 when getting all likes watched movies of the connected user", async () => {
			// given
			const url: string = `${urlWatched}`;
			const token: string = await TestRequestUtils.getAuthenticatedUser(1);

			// when
			const response: Response = await TestRequestUtils.getRequest(url, token);

			// then
			TestResponseUtils.checkResponseOk(response);
		});
	});

});
