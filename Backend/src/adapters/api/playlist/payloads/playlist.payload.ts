import { BasePayloadEntity } from "domain/payloads/base.payload.entity";

export interface CreatePlaylistPayload extends BasePayloadEntity {
	title: string;
}
