/* eslint-disable */
/* prettier-ignore */

export type introspection_types = {
    'Boolean': unknown;
    'Int': unknown;
    'Mutation': { kind: 'OBJECT'; name: 'Mutation'; fields: { 'mutateCount': { name: 'mutateCount'; type: { kind: 'SCALAR'; name: 'Int'; ofType: null; } }; }; };
    'Query': { kind: 'OBJECT'; name: 'Query'; fields: { 'count': { name: 'count'; type: { kind: 'SCALAR'; name: 'Int'; ofType: null; } }; }; };
    'String': unknown;
    'Subscription': { kind: 'OBJECT'; name: 'Subscription'; fields: { 'countMutated': { name: 'countMutated'; type: { kind: 'SCALAR'; name: 'Int'; ofType: null; } }; }; };
};

/** An IntrospectionQuery representation of your schema.
 *
 * @remarks
 * This is an introspection of your schema saved as a file by GraphQLSP.
 * It will automatically be used by `gql.tada` to infer the types of your GraphQL documents.
 * If you need to reuse this data or update your `scalars`, update `tadaOutputLocation` to
 * instead save to a .ts instead of a .d.ts file.
 */
export type introspection = {
  name: never;
  query: 'Query';
  mutation: 'Mutation';
  subscription: 'Subscription';
  types: introspection_types;
};

import * as gqlTada from 'gql.tada';

declare module 'gql.tada' {
  interface setupSchema {
    introspection: introspection
  }
}