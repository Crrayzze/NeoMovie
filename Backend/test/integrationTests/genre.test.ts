import { Response } from "light-my-request";
import { describe, it } from "mocha";
import { TestRequestUtils } from "../utils/request.utils";
import { TestResponseUtils } from "../utils/response.utils";
import { expect } from "chai";

describe("Genre API:", () => {
	const urlGenre: string = "/api/genre";


	describe("Create New Playlist", () => {
		it("it should return a 400 if the user isn't logged in", async () => {
			// given
			const url: string = `${urlGenre}`;
			const payload: Record<string, unknown> = { genres_id: ["16"] };
			// when
			const response: Response = await TestRequestUtils.postRequest(url, payload, "falseToken");

			// then
			TestResponseUtils.checkResponseGenericError(response);
		});

		it("it should return a 200 when the userGenre has been created", async () => {
			// given
			const url: string = `${urlGenre}`;
			const token: string = await TestRequestUtils.getAuthenticatedUser(1);
			const payload: Record<string, unknown> = { genres_id: ["16"] };


			// when
			const response: Response = await TestRequestUtils.postRequest(url, payload, token);

			// then
			TestResponseUtils.checkResponseOk(response);
		});
	});

});
