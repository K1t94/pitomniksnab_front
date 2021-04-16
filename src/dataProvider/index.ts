import buildApolloClient, { buildQuery as buildQueryFactory } from 'ra-data-graphql-simple';
import { LegacyDataProvider } from 'ra-core';

import {
    IntrospectionField,
    IntrospectionSchema,
    IntrospectionType,
} from 'graphql';

import resources from './resources';


type IntrospectionResource = IntrospectionType & {
    [key: string]: IntrospectionField;
};

interface IntrospectionResults {
    types: IntrospectionType[];
    queries: IntrospectionField[];
    resources: IntrospectionResource[];
    schema: IntrospectionSchema;
}


const getGqlResource = (resource: string) => {
    switch (resource) {
        case 'items':
            return 'Items';
        case 'categories':
            return 'Categories';
        case 'content':
            return 'Content';

        default:
            throw new Error(`Unknown resource ${resource}`);
    }
};


const customBuildQuery = (
    introspectionResults: IntrospectionResults
): LegacyDataProvider => {
    const buildQuery = buildQueryFactory(introspectionResults);

    return (type, resourceName, params) => {
        switch(resourceName) {
            case 'Items':
                return resources.items(type, params);
            case 'Categories':
                return resources.categories(type, params);
            case 'Content':
                return resources.content(type, params);

            default:
                return buildQuery(type, resourceName, params);
        }
    };
};


export default (client: any) => {
    return buildApolloClient({
        client,
        buildQuery: customBuildQuery,
    }).then(
        (dataProvider: LegacyDataProvider) => (...rest: Parameters<LegacyDataProvider>) => {
            const [type, resource, params] = rest;
            return dataProvider(type, getGqlResource(resource), params);
        }
    );
};
