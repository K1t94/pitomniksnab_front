import gql from 'graphql-tag';
import {
  GET_LIST, GET_ONE, UPDATE, CREATE, DELETE
} from 'ra-core';
import map from 'lodash/map';

export default (type: string, params: any) => {
  console.log('type', type);
  console.log('params', params);

  switch (type) {
    case GET_LIST:
      let variables = { input: { sort: { direction: 'ASC', field: 'order'} }};

      if (params.sort) {
        variables =  {
          input: { sort: { direction: params.sort.order, field: params.sort.field} },
        }
      }

      return {
        query: gql`
            query GetItems($input: ItemsQueryInput) {
                items(input: $input) {
                    id
                    name
                    description
                    imageURL
                    active
                    order
                    price
                    category {
                        id
                        name
                    }
                }
                categories {
                    id
                    name
                }
            }`,
        variables,
        parseResponse: (response: any) => {
          const { data } = response;

          const items = map(data.items, item => {
            return {
              ...item,
              categories: data.categories,
            }
          });

          return {
            data: items,
            total: data.items.length,
          };
        },
      };

    case GET_ONE:
      return {
        query: gql`
            query GetOneItem($id: ID!) {
                itemById(input: {id: $id}) {
                    id
                    name
                    description
                    imageURL
                    active
                    order
                    price
                    category {
                        id
                        name
                    }
                }
                categories {
                    id
                    name
                }
            }`,
        variables: { id: params.id },
        parseResponse: (response: any) => {
          const { itemById, categories } = response.data;

          return {
            data: {
              ...itemById,
              categories,
            },
          };
        },
      };

    case UPDATE:
      return {
        query: gql`
            mutation updateItem($input: EditItemInput!) {
                editItem(input: $input) {
                    id
                    name
                    description
                    imageURL
                    active
                    order
                    price
                    category {
                        id
                        name
                    }
                }
            }`,
        variables: {
          input: {
            id: params.id,
            name: params.data.name,
            price: params.data.price,
            description: params.data.description,
            active: params.data.active,
            file: params.data.file,
            order: params.data.order,
            categoryId: params.data.category.id,
          },
        },
        parseResponse: (response: any) => {
          const { editItem } = response.data;

          return {
            data: editItem,
          };
        },
      };

    case CREATE:
      console.log('CREATE', params);
      return {
        query: gql`
            mutation AddItem($input: CreateItemInput!) {
                createItem(input: $input) {
                    id
                    name
                    description
                    imageURL
                    active
                    order
                    price
                    category {
                        id
                        name
                    }
                }
            }`,
        variables: {
          input: {
            name: params.data.name,
            price: params.data.price,
            description: params.data.description,
            active: params.data.active,
            file: params.data.file,
            order: params.data.order,
            categoryId: params.data.category.id,
          },
        },
        parseResponse: (response: any) => {
          const { createItem } = response.data;

          return {
            data: createItem,
          };
        },
      };

    case DELETE:
      return {
        query: gql`
            mutation RemoveItem($id: ID!) {
                removeItem(input: {id: $id})
            }`,
        variables: { id: params.id },
        parseResponse: (response: any) => {
          const { removeItem } = response.data;

          return {
            data: removeItem,
          };
        },
      };

    default:
      throw new Error(`Unknown type ${type} provided in exercise resource`);
  }
};
