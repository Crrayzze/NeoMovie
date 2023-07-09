import { Response } from "light-my-request";
import { describe, it } from "mocha";
import { TestRequestUtils } from "../utils/request.utils";
import { TestResponseUtils } from "../utils/response.utils";
import { expect } from "chai";

describe("Movie API:", () => {
	const urlPLaylist: string = "/api/playlist";

	const urlMovie: string = "/movie";

	describe("Create New Playlist", () => {
		it("it should return a 400 if the user isn't logged in", async () => {
			// given
			const url: string = `${urlPLaylist}`;
			const payload: Record<string, unknown> = { title: "Fav horror movies" };
			// when
			const response: Response = await TestRequestUtils.postRequest(url, payload, "falseToken");

			// then
			TestResponseUtils.checkResponseGenericError(response);
		});

		it("it should return a 200 when the playlist has been created", async () => {
			// given
			const url: string = `${urlPLaylist}`;
			const token: string = await TestRequestUtils.getAuthenticatedUser(1);
			const payload: Record<string, unknown> = { title: "Fav horror movies" };


			// when
			const response: Response = await TestRequestUtils.postRequest(url, payload, token);

			// then
			TestResponseUtils.checkResponseOk(response);
		});
	});

	describe("Get All Playlist", () => {
		it("it should return a 400 if the user isn't logged in", async () => {
			// given
			const url: string = `${urlPLaylist}`;

			// when
			const response: Response = await TestRequestUtils.getRequest(url, "falseToken");

			// then
			TestResponseUtils.checkResponseGenericError(response);
		});

		it("it should return a 200 when getting all playlists from the connected user", async () => {
			// given
			const url: string = `${urlPLaylist}`;
			const token: string = await TestRequestUtils.getAuthenticatedUser(1);

			// when
			const response: Response = await TestRequestUtils.getRequest(url, token);

			// then
			TestResponseUtils.checkResponseOk(response);
		});
	});

	describe("Add new movie to a playlist", () => {
		it("it should return a 400 if the user isn't logged in", async () => {
			// given
			const url: string = `${urlPLaylist}${urlMovie}`;
			const payload: Record<string, unknown> = { playlist_id: "bc8a9ff4-a7d1-4da9-a2af-425869af0460", movie_id: "62177" };
			// when
			const response: Response = await TestRequestUtils.postRequest(url, payload, "falseToken");

			// then
			TestResponseUtils.checkResponseGenericError(response);
		});

		it("it should return a 200 when the movie has been added to the playlist", async () => {
			// given
			const url: string = `${urlPLaylist}${urlMovie}`;
			const token: string = await TestRequestUtils.getAuthenticatedUser(1);
			const payload: Record<string, unknown> = { playlist_id: "bc8a9ff4-a7d1-4da9-a2af-425869af0460", movie_id: "62177" };

			// when
			const response: Response = await TestRequestUtils.postRequest(url, payload, token);

			// then
			TestResponseUtils.checkResponseOk(response);
		});
	});

	describe("Delete movie from a playlist", () => {
		it("it should return a 400 if the user isn't logged in", async () => {
			// given
			const url: string = `${urlPLaylist}${urlMovie}`;
			const payload: Record<string, unknown> = { playlist_movie_id: "95b51858-4d7a-4112-a80a-3c23e33161c5" };
			// when
			const response: Response = await TestRequestUtils.deleteRequest(url, payload, "falseToken");

			// then
			TestResponseUtils.checkResponseGenericError(response);
		});

		it("it should return a 200 when the movie has been added to the playlist", async () => {
			// given
			const url: string = `${urlPLaylist}${urlMovie}`;
			const token: string = await TestRequestUtils.getAuthenticatedUser(1);
			const payload: Record<string, unknown> = { playlist_movie_id: "95b51858-4d7a-4112-a80a-3c23e33161c5" };

			// when
			const response: Response = await TestRequestUtils.deleteRequest(url, payload, token);

			// then
			TestResponseUtils.checkResponseOk(response);
		});
	});
});
