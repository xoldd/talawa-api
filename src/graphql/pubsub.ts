import type { Readable } from "node:stream";

// This file is to be used to define the types for making the event based publish/subscribe module used in the graphql resolvers type-safe.

/**
 * Type of the events in the publish-subscribe bus and the values they will resolve to. This would need to be extended with fields and maintained as graphql subscriptions functionality is added to the graphql server. More information can be found here:- {@link https://the-guild.dev/graphql/yoga-server/docs/features/subscriptions#topics}
 */
export type PubSubPublishArgsByKey = {
	[key: string]: unknown;
};

/**
 * Type of the publish and subscribe bus object used for publishing and subscribing to talawa events.
 */
export type PubSub = {
	/**
	 * This method is used to publish an event.
	 */
	publish<TKey extends Extract<keyof PubSubPublishArgsByKey, string>>(
		event: {
			topic: TKey;
			payload: PubSubPublishArgsByKey[TKey];
		},
		callback?: () => void,
	): void;
	/**
	 * This method is used to subscribe to events.
	 */
	subscribe<TKey extends Extract<keyof PubSubPublishArgsByKey, string>>(
		topics: TKey | TKey[],
	): Promise<Readable & AsyncIterableIterator<PubSubPublishArgsByKey[TKey]>>;
};
