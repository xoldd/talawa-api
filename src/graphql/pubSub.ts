import type { PubSub } from "graphql-yoga";

/**
 * This file is to be used to define the publish/subscribe module used in the graphQL
 * subscriptions.
 */

/**
 * Type of the events in the publish-subscribe bus and the values they will resolve to. This would
 * need to be extended with fields and maintained as graphQL subscriptions functionality is added
 * to the graphQL server. More information can be found here:- {@link https://the-guild.dev/graphql/yoga-server/docs/features/subscriptions#topics}
 */
export type TalawaPubSubPublishArgsByKey = {
	[key: string]: [] | [unknown] | [number | string, unknown];
};

/**
 * Type of the publish and subscribe bus object used for publishing and subscribing to talawa events.
 */
export type TalawaPubSub = PubSub<TalawaPubSubPublishArgsByKey>;
