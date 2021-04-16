import gql from 'graphql-tag';
import {
  GET_LIST, GET_ONE, UPDATE, CREATE, DELETE,
} from 'ra-core';
import map from 'lodash/map';

export default (type: string, params: any) => {
  switch (type) {
    case GET_ONE:
      return {
        query: gql`
            query getContent {
                content {
                    companyInfo
                    email
                    howToBuy
                    mainHeader
                    mainText
                    phone
                }
            }`,
        parseResponse: (response: any) => {
          const { content } = response.data;

          return {
            data: content,
          };
        },
      };

    case UPDATE:
      return {
        query: gql`
            mutation editContent($input: EditContentInput!) {
                editContent(input: $input) {
                    companyInfo
                    email
                    howToBuy
                    mainHeader
                    mainText
                    phone
                }
            }`,
        variables: {
          input: {
            companyInfo: params.data.companyInfo,
            email: params.data.email,
            howToBuy: params.data.howToBuy,
            mainHeader: params.data.mainHeader,
            mainText: params.data.mainText,
            phone: params.data.phone,
          },
        },
        parseResponse: (response: any) => {
          const { editContent } = response.data;

          return {
            data: editContent,
          };
        },
      };

    default:
      throw new Error(`Unknown type ${type} provided in exercise resource`);
  }
};
