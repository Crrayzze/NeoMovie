import { Response } from "light-my-request";
import { describe, it } from "mocha";
import { TestRequestUtils } from "../utils/request.utils";
import { TestResponseUtils } from "../utils/response.utils";
import { expect } from "chai";
import { LoginResponsePresenter } from "adapters/api/authentication/presenters/loginResponse.authentication.presenter";


describe("Authentication API:", () => {
	const urlAuthentication: string = "/api/authentication";

	const urlRegister: string = "/register";
	const urlLogin: string = "/login";

	describe("Register", () => {
		it("it should return a 200 when user has been created", async () => {
			// given
			const url: string = `${urlAuthentication}${urlRegister}`;
			const payload: Record<string, unknown> = { username: "XxLucasxX", password: "LucasTropFort" };

			// when
			const response: Response = await TestRequestUtils.postRequest(url, payload);

			// then
			TestResponseUtils.checkResponseOk(response);
		});
	});

	describe("Login", () => {
		it("it should return a 400 when username and password missmatch the user", async () => {
			// given
			const url: string = `${urlAuthentication}${urlLogin}`;
			const payload: Record<string, unknown> = { username: "Wrong", password: "WrongPassword!" };

			// when
			const response: Response = await TestRequestUtils.postRequest(url, payload);

			// then
			TestResponseUtils.checkResponseGenericError(response);
		});

		it("it should return a 400 when password missmatch the user", async () => {
			// given
			const url: string = `${urlAuthentication}${urlLogin}`;
			const payload: Record<string, unknown> = { username: "RWeasley", password: "WrongPassword!" };

			// when
			const response: Response = await TestRequestUtils.postRequest(url, payload);

			// then
			TestResponseUtils.checkResponseGenericError(response);
		});

		it("it should return a 200 when user has been logged", async () => {
			// given
			const url: string = `${urlAuthentication}${urlLogin}`;
			const payload: Record<string, unknown> = { username: "RWeasley", password: "bigPassword" };

			// when
			const response: Response = await TestRequestUtils.postRequest(url, payload);

			// then
			TestResponseUtils.checkResponseOk(response);
		});
	});

	describe("Login & Token", () => {
		it("it should return a 400 when username and password missmatch the user", async () => {
			// given
			const url: string = `${urlAuthentication}${urlLogin}`;
			const payload: Record<string, unknown> = { username: "Wrong", password: "WrongPassword!" };

			// when
			const response: Response = await TestRequestUtils.postRequest(url, payload);

			// then
			TestResponseUtils.checkResponseGenericError(response);
		});

		it("it should return a 400 when password missmatch the user", async () => {
			// given
			const url: string = `${urlAuthentication}${urlLogin}`;
			const payload: Record<string, unknown> = { username: "RWeasley", password: "WrongPassword!" };

			// when
			const response: Response = await TestRequestUtils.postRequest(url, payload);

			// then
			TestResponseUtils.checkResponseGenericError(response);
		});

		it("it should return a 200 when user has been logged and token should not be empty", async () => {
			// given
			const url: string = `${urlAuthentication}${urlLogin}`;
			const payload: Record<string, unknown> = { username: "RWeasley", password: "bigPassword" };

			// when
			const response: Response = await TestRequestUtils.postRequest(url, payload);

			// then
			const result: LoginResponsePresenter = TestResponseUtils.checkResponseOk(response);
			// eslint-disable-next-line @typescript-eslint/no-unused-expressions
			expect(result.token).to.not.be.empty;
		});
	});
});
