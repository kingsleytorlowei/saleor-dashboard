/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { ProductErrorCode, AttributeInputTypeEnum, WeightUnitsEnum } from "./../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: ProductImageCreate
// ====================================================

export interface ProductImageCreate_productImageCreate_errors {
  __typename: "ProductError";
  code: ProductErrorCode;
  field: string | null;
}

export interface ProductImageCreate_productImageCreate_product_attributes_attribute_values {
  __typename: "AttributeValue";
  id: string;
  name: string | null;
  slug: string | null;
}

export interface ProductImageCreate_productImageCreate_product_attributes_attribute {
  __typename: "Attribute";
  id: string;
  slug: string | null;
  name: string | null;
  inputType: AttributeInputTypeEnum | null;
  valueRequired: boolean;
  values: (ProductImageCreate_productImageCreate_product_attributes_attribute_values | null)[] | null;
}

export interface ProductImageCreate_productImageCreate_product_attributes_values {
  __typename: "AttributeValue";
  id: string;
  name: string | null;
  slug: string | null;
}

export interface ProductImageCreate_productImageCreate_product_attributes {
  __typename: "SelectedAttribute";
  attribute: ProductImageCreate_productImageCreate_product_attributes_attribute;
  values: (ProductImageCreate_productImageCreate_product_attributes_values | null)[];
}

export interface ProductImageCreate_productImageCreate_product_productType_variantAttributes_values {
  __typename: "AttributeValue";
  id: string;
  name: string | null;
  slug: string | null;
}

export interface ProductImageCreate_productImageCreate_product_productType_variantAttributes {
  __typename: "Attribute";
  id: string;
  name: string | null;
  values: (ProductImageCreate_productImageCreate_product_productType_variantAttributes_values | null)[] | null;
}

export interface ProductImageCreate_productImageCreate_product_productType_taxType {
  __typename: "TaxType";
  description: string | null;
  taxCode: string | null;
}

export interface ProductImageCreate_productImageCreate_product_productType {
  __typename: "ProductType";
  id: string;
  variantAttributes: (ProductImageCreate_productImageCreate_product_productType_variantAttributes | null)[] | null;
  name: string;
  hasVariants: boolean;
  taxType: ProductImageCreate_productImageCreate_product_productType_taxType | null;
}

export interface ProductImageCreate_productImageCreate_product_channelListing_channel {
  __typename: "Channel";
  id: string;
  name: string;
  currencyCode: string;
}

export interface ProductImageCreate_productImageCreate_product_channelListing_discountedPrice {
  __typename: "Money";
  amount: number;
  currency: string;
}

export interface ProductImageCreate_productImageCreate_product_channelListing {
  __typename: "ProductChannelListing";
  channel: ProductImageCreate_productImageCreate_product_channelListing_channel;
  discountedPrice: ProductImageCreate_productImageCreate_product_channelListing_discountedPrice | null;
  isPublished: boolean;
  publicationDate: any | null;
  isAvailableForPurchase: boolean | null;
  availableForPurchase: any | null;
  visibleInListings: boolean;
}

export interface ProductImageCreate_productImageCreate_product_metadata {
  __typename: "MetadataItem";
  key: string;
  value: string;
}

export interface ProductImageCreate_productImageCreate_product_privateMetadata {
  __typename: "MetadataItem";
  key: string;
  value: string;
}

export interface ProductImageCreate_productImageCreate_product_defaultVariant {
  __typename: "ProductVariant";
  id: string;
}

export interface ProductImageCreate_productImageCreate_product_category {
  __typename: "Category";
  id: string;
  name: string;
}

export interface ProductImageCreate_productImageCreate_product_collections {
  __typename: "Collection";
  id: string;
  name: string;
}

export interface ProductImageCreate_productImageCreate_product_images {
  __typename: "ProductImage";
  id: string;
  alt: string;
  sortOrder: number | null;
  url: string;
}

export interface ProductImageCreate_productImageCreate_product_variants_stocks_warehouse {
  __typename: "Warehouse";
  id: string;
  name: string;
}

export interface ProductImageCreate_productImageCreate_product_variants_stocks {
  __typename: "Stock";
  id: string;
  quantity: number;
  quantityAllocated: number;
  warehouse: ProductImageCreate_productImageCreate_product_variants_stocks_warehouse;
}

export interface ProductImageCreate_productImageCreate_product_variants_channelListing_channel {
  __typename: "Channel";
  id: string;
  name: string;
  currencyCode: string;
}

export interface ProductImageCreate_productImageCreate_product_variants_channelListing_price {
  __typename: "Money";
  amount: number;
  currency: string;
}

export interface ProductImageCreate_productImageCreate_product_variants_channelListing_costPrice {
  __typename: "Money";
  amount: number;
  currency: string;
}

export interface ProductImageCreate_productImageCreate_product_variants_channelListing {
  __typename: "ProductVariantChannelListing";
  channel: ProductImageCreate_productImageCreate_product_variants_channelListing_channel;
  price: ProductImageCreate_productImageCreate_product_variants_channelListing_price | null;
  costPrice: ProductImageCreate_productImageCreate_product_variants_channelListing_costPrice | null;
}

export interface ProductImageCreate_productImageCreate_product_variants {
  __typename: "ProductVariant";
  id: string;
  sku: string;
  name: string;
  margin: number | null;
  stocks: (ProductImageCreate_productImageCreate_product_variants_stocks | null)[] | null;
  trackInventory: boolean;
  channelListing: ProductImageCreate_productImageCreate_product_variants_channelListing[] | null;
}

export interface ProductImageCreate_productImageCreate_product_weight {
  __typename: "Weight";
  unit: WeightUnitsEnum;
  value: number;
}

export interface ProductImageCreate_productImageCreate_product_taxType {
  __typename: "TaxType";
  description: string | null;
  taxCode: string | null;
}

export interface ProductImageCreate_productImageCreate_product {
  __typename: "Product";
  id: string;
  attributes: ProductImageCreate_productImageCreate_product_attributes[];
  productType: ProductImageCreate_productImageCreate_product_productType;
  channelListing: ProductImageCreate_productImageCreate_product_channelListing[] | null;
  metadata: (ProductImageCreate_productImageCreate_product_metadata | null)[];
  privateMetadata: (ProductImageCreate_productImageCreate_product_privateMetadata | null)[];
  name: string;
  slug: string;
  descriptionJson: any;
  seoTitle: string | null;
  seoDescription: string | null;
  defaultVariant: ProductImageCreate_productImageCreate_product_defaultVariant | null;
  category: ProductImageCreate_productImageCreate_product_category | null;
  collections: (ProductImageCreate_productImageCreate_product_collections | null)[] | null;
  chargeTaxes: boolean;
  images: (ProductImageCreate_productImageCreate_product_images | null)[] | null;
  variants: (ProductImageCreate_productImageCreate_product_variants | null)[] | null;
  weight: ProductImageCreate_productImageCreate_product_weight | null;
  taxType: ProductImageCreate_productImageCreate_product_taxType | null;
}

export interface ProductImageCreate_productImageCreate {
  __typename: "ProductImageCreate";
  errors: ProductImageCreate_productImageCreate_errors[];
  product: ProductImageCreate_productImageCreate_product | null;
}

export interface ProductImageCreate {
  productImageCreate: ProductImageCreate_productImageCreate | null;
}

export interface ProductImageCreateVariables {
  product: string;
  image: any;
  alt?: string | null;
}
