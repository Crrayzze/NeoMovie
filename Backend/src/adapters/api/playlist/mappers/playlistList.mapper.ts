import { ApiMapper } from "application/mappers/api.mapper";
import { PlaylistEntity } from "domain/entities/playlist.entities";
import { PlaylistPresenter } from "../presenters/playlist.presenter";
import { BasePayloadEntity } from "domain/payloads/base.payload.entity";

export class PlaylistListApiMapper implements ApiMapper<PlaylistEntity, PlaylistPresenter, BasePayloadEntity> {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	toEntity(payload: BasePayloadEntity): PlaylistEntity {
		throw new Error("not implemented");
	}

	toApi(entity: PlaylistEntity): PlaylistPresenter {
		const presenter: PlaylistPresenter = {
			id: entity.id,
			title: entity.title,
			movie: []
		};

		return presenter;
	}
}
