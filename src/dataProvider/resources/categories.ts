import gql from 'graphql-tag';
import {
  GET_LIST, GET_ONE, UPDATE, CREATE, DELETE
} from 'ra-core';
import map from 'lodash/map';

export default (type: string, params: any) => {
  switch (type) {
    case GET_LIST:
      return {
        query: gql`
            query GetCategories {
                categories {
                    id
                    name
                    order
                    active
                    items {
                        id
                    }
                }
            }`,
        parseResponse: (response: any) => {
          const { data } = response;

          const categories = map(data.categories, item => {
            return {
              ...item,
              itemsCount: item.items.length,
            }
          });

          return {
            data: categories,
            total: data.categories.length,
          };
        },
      };

    case GET_ONE:
      return {
        query: gql`
            query GetOneCategory($id: ID!) {
                categoryById(input: {id: $id}) {
                    id
                    name
                    order
                    active
                    items {
                        id
                    }
                }
            }`,
        variables: { id: params.id },
        parseResponse: (response: any) => {
          const { categoryById } = response.data;

          return {
            data: {
              ...categoryById,
              itemsCount: categoryById.items.length,
            },
          };
        },
      };

    case UPDATE:
      return {
        query: gql`
            mutation editCategory($input: EditCategoryInput!) {
                editCategory(input: $input) {
                    id
                    name
                    active
                    order
                }
            }`,
        variables: {
          input: {
            id: params.id,
            name: params.data.name,
            active: params.data.active,
            order: params.data.order,
          },
        },
        parseResponse: (response: any) => {
          const { editCategory } = response.data;

          return {
            data: editCategory,
          };
        },
      };

    case CREATE:
      return {
        query: gql`
            mutation CreateCategory($input: CreateCategoryInput!) {
                createCategory(input: $input) {
                    id
                    name
                    active
                    order
                }
            }`,
        variables: {
          input: {
            name: params.data.name,
            active: params.data.active,
            order: params.data.order,
          },
        },
        parseResponse: (response: any) => {
          const { createCategory } = response.data;

          return {
            data: createCategory,
          };
        },
      };

    case DELETE:
      return {
        query: gql`
            mutation RemoveCategory($id: ID!) {
                removeCategory(input: {id: $id})
            }`,
        variables: { id: params.id },
        parseResponse: (response: any) => {
          const { removeCategory } = response.data;

          return {
            data: removeCategory,
          };
        },
      };

    default:
      throw new Error(`Unknown type ${type} provided in exercise resource`);
  }
};
