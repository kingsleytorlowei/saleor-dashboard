import { pageInfoFragment } from "@saleor/fragments/pageInfo";
import makeSearch from "@saleor/hooks/makeSearch";
import gql from "graphql-tag";

import {
  SearchAvailableAttributes,
  SearchAvailableAttributesVariables
} from "./types/SearchAvailableAttributes";

export const searchAttributes = gql`
  ${pageInfoFragment}
  query SearchAvailableAttributes(
    $id: ID!
    $after: String
    $first: Int!
    $query: String!
  ) {
    pageType(id: $id) {
      id
      availableAttributes(
        after: $after
        first: $first
        filter: { search: $query }
      ) {
        edges {
          node {
            id
            name
            slug
          }
        }
        pageInfo {
          ...PageInfoFragment
        }
      }
    }
  }
`;

export default makeSearch<
  SearchAvailableAttributes,
  SearchAvailableAttributesVariables
>(searchAttributes, result =>
  result.loadMore(
    (prev, next) => {
      if (
        prev.pageType.availableAttributes.pageInfo.endCursor ===
        next.pageType.availableAttributes.pageInfo.endCursor
      ) {
        return prev;
      }

      return {
        ...prev,
        pageType: {
          ...prev.pageType,
          availableAttributes: {
            ...prev.pageType.availableAttributes,
            edges: [
              ...prev.pageType.availableAttributes.edges,
              ...next.pageType.availableAttributes.edges
            ],
            pageInfo: next.pageType.availableAttributes.pageInfo
          }
        }
      };
    },
    {
      after: result.data.pageType.availableAttributes.pageInfo.endCursor
    }
  )
);
