import type { advertisementsTable } from "~/src/drizzle/tables/advertisements";
import { builder } from "~/src/graphql/builder";
import { AdvertisementType } from "~/src/graphql/enums/AdvertisementType";
import {
	AdvertisementAttachment,
	type AdvertisementAttachment as AdvertisementAttachmentType,
} from "~/src/graphql/types/AdvertisementAttachment/AdvertisementAttachment";

export type Advertisement = typeof advertisementsTable.$inferSelect & {
	attachments: AdvertisementAttachmentType[] | null;
};

export const Advertisement = builder.objectRef<Advertisement>("Advertisement");

Advertisement.implement({
	description: "",
	fields: (t) => ({
		attachments: t.expose("attachments", {
			description: "Array of attachments.",
			type: t.listRef(AdvertisementAttachment),
		}),
		createdAt: t.expose("createdAt", {
			description: "",
			type: "DateTime",
		}),
		description: t.exposeString("description", {
			description: "Custom information about the advertisement.",
		}),
		endAt: t.expose("endAt", {
			description: "",
			type: "DateTime",
		}),
		id: t.exposeID("id", {
			description: "Global identifier of the advertisement.",
			nullable: false,
		}),
		name: t.exposeString("name", {
			description: "Name of the advertisement.",
		}),
		startAt: t.expose("startAt", {
			description: "",
			type: "DateTime",
		}),
		type: t.expose("type", {
			description: "",
			type: AdvertisementType,
		}),
		updatedAt: t.expose("updatedAt", {
			description: "",
			type: "DateTime",
		}),
	}),
});