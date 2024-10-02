import type { Readable } from "node:stream";
// import type { PubSub } from "graphql-yoga";

/**
 * This file is to be used to define the types for making the event based publish/subscribe module used in the graphQL resolvers type-safe.
 */

/**
 * Type of the events in the publish-subscribe bus and the values they will resolve to. This would need to be extended with fields and maintained as graphQL subscriptions functionality is added to the graphQL server. More information can be found here:- {@link https://the-guild.dev/graphql/yoga-server/docs/features/subscriptions#topics}
 */
export type TalawaPubSubPublishArgsByKey = {
	countMutated: number;
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
