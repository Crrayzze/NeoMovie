import { BasePayloadEntity } from "domain/payloads/base.payload.entity";

export interface UserRegisterPayload extends BasePayloadEntity {
	username: string;
	password: string;
}

export interface UserLoginPayload extends BasePayloadEntity {
	username: string;
	password: string;
}
