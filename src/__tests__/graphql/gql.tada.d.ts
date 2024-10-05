/* eslint-disable */
/* prettier-ignore */

export type introspection_types = {
    'Boolean': unknown;
    'CountryCode': unknown;
    'Currency': unknown;
    'Date': unknown;
    'DateTime': unknown;
    'Duration': unknown;
    'EmailAddress': unknown;
    'HexColorCode': unknown;
    'ID': unknown;
    'IP': unknown;
    'IPv4': unknown;
    'IPv6': unknown;
    'JSONObject': unknown;
    'Latitude': unknown;
    'Longitude': unknown;
    'Message': { kind: 'OBJECT'; name: 'Message'; fields: { 'body': { name: 'body'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'String'; ofType: null; }; } }; 'id': { name: 'id'; type: { kind: 'NON_NULL'; name: never; ofType: { kind: 'SCALAR'; name: 'ID'; ofType: null; }; } }; }; };
    'Mutation': { kind: 'OBJECT'; name: 'Mutation'; fields: { 'createMessage': { name: 'createMessage'; type: { kind: 'OBJECT'; name: 'Message'; ofType: null; } }; 'updateMessage': { name: 'updateMessage'; type: { kind: 'OBJECT'; name: 'Message'; ofType: null; } }; }; };
    'NegativeFloat': unknown;
    'NegativeInt': unknown;
    'NonEmptyString': unknown;
    'NonNegativeFloat': unknown;
    'NonNegativeInt': unknown;
    'NonPositiveFloat': unknown;
    'NonPositiveInt': unknown;
    'PhoneNumber': unknown;
    'PositiveFloat': unknown;
    'PositiveInt': unknown;
    'Query': { kind: 'OBJECT'; name: 'Query'; fields: { 'message': { name: 'message'; type: { kind: 'OBJECT'; name: 'Message'; ofType: null; } }; 'messages': { name: 'messages'; type: { kind: 'LIST'; name: never; ofType: { kind: 'NON_NULL'; name: never; ofType: { kind: 'OBJECT'; name: 'Message'; ofType: null; }; }; } }; }; };
    'String': unknown;
    'Subscription': { kind: 'OBJECT'; name: 'Subscription'; fields: { 'messageUpdated': { name: 'messageUpdated'; type: { kind: 'OBJECT'; name: 'Message'; ofType: null; } }; }; };
    'Time': unknown;
    'TimeZone': unknown;
    'Timestamp': unknown;
    'URL': unknown;
    'UTCOffset': unknown;
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