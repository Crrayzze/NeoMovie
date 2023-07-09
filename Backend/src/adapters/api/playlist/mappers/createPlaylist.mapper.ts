import { ApiMapper } from "application/mappers/api.mapper";
import { PlaylistEntity } from "domain/entities/playlist.entities";
import { BasePresenter } from "domain/presenters/base.presenter";
import { CreatePlaylistPayload } from "../payloads/playlist.payload";

export class CreatePlaylistApiMapper implements ApiMapper<PlaylistEntity, BasePresenter, CreatePlaylistPayload> {
	toEntity(payload: CreatePlaylistPayload): PlaylistEntity {
		const entity: PlaylistEntity = {
			title: payload.title,
			user: undefined
		};
		return entity;
	}

  	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	toApi(entity: PlaylistEntity): BasePresenter {
		throw new Error("not implemented");
	}
}
