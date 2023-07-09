import { BasePayloadEntity } from "domain/payloads/base.payload.entity";

export interface CreateLikePayload extends BasePayloadEntity {
	movieId: string;
}
