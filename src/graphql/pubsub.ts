import type { Readable } from "node:stream";
import type { Message } from "./context.js";

// This file is to be used to define the types for making the event based publish/subscribe module used in the graphql resolvers type-safe.

type MessageId = string;

/**
 * Type of the events in the publish-subscribe bus and the values they will resolve to. This would need to be extended with fields and maintained as graphql subscriptions functionality is added to the graphql server. More information can be found here:- {@link https://the-guild.dev/graphql/yoga-server/docs/features/subscriptions#topics}
 */
export type TalawaPubSubPublishArgsByKey = {
	[key: `messageUpdated:${MessageId}`]: Message;
};

/**
 * Type of the publish and subscribe bus object used for publishing and subscribing to talawa events.
 */
export type TalawaPubSub = {
	publish<TKey extends Extract<keyof TalawaPubSubPublishArgsByKey, string>>(
		event: {
			topic: TKey;
			payload: TalawaPubSubPublishArgsByKey[TKey];
		},
		callback?: () => void,
	): void;
	subscribe<TKey extends Extract<keyof TalawaPubSubPublishArgsByKey, string>>(
		topics: TKey | TKey[],
	): Promise<
		Readable & AsyncIterableIterator<TalawaPubSubPublishArgsByKey[TKey]>
	>;
};
