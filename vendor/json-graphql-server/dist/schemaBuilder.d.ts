import type { Data } from './types';
/**
 * Generates a GraphQL Schema object for your data
 *
 * @param {any} data
 * @returns A GraphQL Schema
 *
 * @example
 * import {graphql} from 'graphql';
 * import {jsonSchemaBuilder} from 'json-graphql-server';
 *
 * const data = {
 *    "posts": [
 *        {
 *            "id": 1,
 *            "title": "Lorem Ipsum",
 *            "views": 254,
 *            "user_id": 123,
 *        },
 *        {
 *            "id": 2,
 *            "title": "Sic Dolor amet",
 *            "views": 65,
 *            "user_id": 456,
 *        },
 *    ],
 *    "users": [
 *        {
 *            "id": 123,
 *            "name": "John Doe"
 *        },
 *        {
 *            "id": 456,
 *            "name": "Jane Doe"
 *        }
 *    ],
 * };
 *
 * const schema = jsonSchemaBuilder(data);
 * const query = `[...]`
 * graphql(schema, query).then(result => {
 *   console.log(result);
 * });
 *
 */
declare const _default: (data: Data) => import("graphql").GraphQLSchema;
export default _default;
export declare const getPlainSchema: (data: Data) => {
    typeDefs: string;
    resolvers: any;
};
//# sourceMappingURL=schemaBuilder.d.ts.map