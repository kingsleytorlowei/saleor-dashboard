import gql from "graphql-tag";

import { metadataFragment } from "./metadata";
import { taxTypeFragment } from "./taxes";
import { weightFragment } from "./weight";

export const stockFragment = gql`
  fragment StockFragment on Stock {
    id
    quantity
    quantityAllocated
    warehouse {
      id
      name
    }
  }
`;

export const fragmentMoney = gql`
  fragment Money on Money {
    amount
    currency
  }
`;

export const fragmentProductImage = gql`
  fragment ProductImageFragment on ProductImage {
    id
    alt
    sortOrder
    url
  }
`;

export const productFragment = gql`
  fragment ProductFragment on Product {
    id
    name
    thumbnail {
      url
    }
    isAvailable
    productType {
      id
      name
      hasVariants
    }
    channelListing {
      channel {
        id
        name
      }
      isPublished
      publicationDate
    }
  }
`;

export const productVariantAttributesFragment = gql`
  fragment ProductVariantAttributesFragment on Product {
    id
    attributes {
      attribute {
        id
        slug
        name
        inputType
        valueRequired
        values {
          id
          name
          slug
        }
      }
      values {
        id
        name
        slug
      }
    }
    productType {
      id
      variantAttributes {
        id
        name
        values {
          id
          name
          slug
        }
      }
    }
    channelListing {
      channel {
        id
        name
        currencyCode
      }
      discountedPrice {
        amount
        currency
      }
    }
  }
`;

export const productFragmentDetails = gql`
  ${fragmentProductImage}
  ${fragmentMoney}
  ${productVariantAttributesFragment}
  ${stockFragment}
  ${weightFragment}
  ${metadataFragment}
  ${taxTypeFragment}
  fragment Product on Product {
    ...ProductVariantAttributesFragment
    ...MetadataFragment
    name
    slug
    descriptionJson
    seoTitle
    seoDescription
    defaultVariant {
      id
    }
    category {
      id
      name
    }
    collections {
      id
      name
    }
    margin {
      start
      stop
    }
    purchaseCost {
      start {
        ...Money
      }
      stop {
        ...Money
      }
    }
    isAvailableForPurchase
    isAvailable
    chargeTaxes
    channelListing {
      channel {
        id
        name
        currencyCode
      }
      isPublished
      publicationDate
      discountedPrice {
        amount
        currency
      }
    }
    images {
      ...ProductImageFragment
    }
    variants {
      id
      sku
      name
      margin
      stocks {
        ...StockFragment
      }
      trackInventory
      channelListing {
        channel {
          id
          name
          currencyCode
        }
        price {
          amount
          currency
        }
      }
    }
    productType {
      id
      name
      hasVariants
      taxType {
        ...TaxTypeFragment
      }
    }
    weight {
      ...WeightFragment
    }
    taxType {
      ...TaxTypeFragment
    }
    availableForPurchase
    visibleInListings
  }
`;

export const fragmentVariant = gql`
  ${fragmentMoney}
  ${fragmentProductImage}
  ${stockFragment}
  ${weightFragment}
  ${metadataFragment}
  fragment ProductVariant on ProductVariant {
    id
    ...MetadataFragment
    attributes {
      attribute {
        id
        name
        slug
        valueRequired
        values {
          id
          name
          slug
        }
      }
      values {
        id
        name
        slug
      }
    }
    costPrice {
      ...Money
    }
    images {
      id
      url
    }
    name
    product {
      id
      defaultVariant {
        id
      }
      images {
        ...ProductImageFragment
      }
      name
      thumbnail {
        url
      }
      variants {
        id
        name
        sku
        images {
          id
          url
        }
      }
      defaultVariant {
        id
      }
    }
    channelListing {
      channel {
        id
        name
        currencyCode
      }
      price {
        ...Money
      }
    }
    sku
    stocks {
      ...StockFragment
    }
    trackInventory
    weight {
      ...WeightFragment
    }
  }
`;

export const exportFileFragment = gql`
  fragment ExportFileFragment on ExportFile {
    id
    status
    url
  }
`;
