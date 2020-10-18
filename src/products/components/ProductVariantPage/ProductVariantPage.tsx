import { ChannelPriceData } from "@saleor/channels/utils";
import AppHeader from "@saleor/components/AppHeader";
import CardSpacer from "@saleor/components/CardSpacer";
import { ConfirmButtonTransitionState } from "@saleor/components/ConfirmButton";
import Container from "@saleor/components/Container";
import Form from "@saleor/components/Form";
import Grid from "@saleor/components/Grid";
import { MetadataFormData } from "@saleor/components/Metadata";
import Metadata from "@saleor/components/Metadata/Metadata";
import PageHeader from "@saleor/components/PageHeader";
import SaveButtonBar from "@saleor/components/SaveButtonBar";
import { ProductErrorWithAttributesFragment } from "@saleor/fragments/types/ProductErrorWithAttributesFragment";
import { ProductVariant } from "@saleor/fragments/types/ProductVariant";
import { WarehouseFragment } from "@saleor/fragments/types/WarehouseFragment";
import useFormset, {
  FormsetChange,
  FormsetData
} from "@saleor/hooks/useFormset";
import { ProductVariantChannelListingUpdate_productVariantChannelListingUpdate_productChannelListingErrors } from "@saleor/products/types/ProductVariantChannelListingUpdate";
import { VariantUpdate_productVariantUpdate_errors } from "@saleor/products/types/VariantUpdate";
import {
  getAttributeInputFromVariant,
  getStockInputFromVariant
} from "@saleor/products/utils/data";
import { createVariantChannelsChangeHandler } from "@saleor/products/utils/handlers";
import {
  validateCostPrice,
  validatePrice
} from "@saleor/products/utils/validation";
import { ReorderAction } from "@saleor/types";
import { mapMetadataItemToInput } from "@saleor/utils/maps";
import useMetadataChangeTrigger from "@saleor/utils/metadata/useMetadataChangeTrigger";
import { diff } from "fast-array-diff";
import React from "react";

import { maybe } from "../../../misc";
import ProductShipping from "../ProductShipping/ProductShipping";
import ProductStocks, { ProductStockInput } from "../ProductStocks";
import ProductVariantAttributes, {
  VariantAttributeInputData
} from "../ProductVariantAttributes";
import ProductVariantImages from "../ProductVariantImages";
import ProductVariantImageSelectDialog from "../ProductVariantImageSelectDialog";
import ProductVariantNavigation from "../ProductVariantNavigation";
import ProductVariantPrice from "../ProductVariantPrice";
import ProductVariantSetDefault from "../ProductVariantSetDefault";

export interface ProductVariantPageFormData extends MetadataFormData {
  channelListing: ChannelPriceData[];
  sku: string;
  trackInventory: boolean;
  weight: string;
}

export interface ProductVariantPageSubmitData
  extends ProductVariantPageFormData {
  attributes: FormsetData<VariantAttributeInputData, string>;
  addStocks: ProductStockInput[];
  updateStocks: ProductStockInput[];
  removeStocks: string[];
}

interface ProductVariantPageProps {
  defaultVariantId?: string;
  defaultWeightUnit: string;
  errors:
    | ProductErrorWithAttributesFragment[]
    | VariantUpdate_productVariantUpdate_errors[];
  header: string;
  channels: ChannelPriceData[];
  channelErrors: ProductVariantChannelListingUpdate_productVariantChannelListingUpdate_productChannelListingErrors[];
  loading?: boolean;
  placeholderImage?: string;
  saveButtonBarState: ConfirmButtonTransitionState;
  variant?: ProductVariant;
  warehouses: WarehouseFragment[];
  onVariantReorder: ReorderAction;
  onAdd();
  onBack();
  onDelete();
  onSubmit(data: ProductVariantPageSubmitData);
  onImageSelect(id: string);
  onVariantClick(variantId: string);
  onSetDefaultVariant();
  onWarehouseConfigure();
}

const ProductVariantPage: React.FC<ProductVariantPageProps> = ({
  channels,
  channelErrors,
  defaultVariantId,
  defaultWeightUnit,
  errors,
  header,
  loading,
  placeholderImage,
  saveButtonBarState,
  variant,
  warehouses,
  onAdd,
  onBack,
  onDelete,
  onImageSelect,
  onSubmit,
  onVariantClick,
  onVariantReorder,
  onSetDefaultVariant,
  onWarehouseConfigure
}) => {
  const attributeInput = React.useMemo(
    () => getAttributeInputFromVariant(variant),
    [variant]
  );
  const stockInput = React.useMemo(() => getStockInputFromVariant(variant), [
    variant
  ]);
  const { change: changeAttributeData, data: attributes } = useFormset(
    attributeInput
  );
  const {
    add: addStock,
    change: changeStockData,
    data: stocks,
    remove: removeStock
  } = useFormset(stockInput);

  const [isModalOpened, setModalStatus] = React.useState(false);
  const toggleModal = () => setModalStatus(!isModalOpened);

  const {
    isMetadataModified,
    isPrivateMetadataModified,
    makeChangeHandler: makeMetadataChangeHandler
  } = useMetadataChangeTrigger();

  const variantImages = maybe(() => variant.images.map(image => image.id), []);
  const productImages = maybe(() =>
    variant.product.images.sort((prev, next) =>
      prev.sortOrder > next.sortOrder ? 1 : -1
    )
  );
  const images = maybe(() =>
    productImages
      .filter(image => variantImages.indexOf(image.id) !== -1)
      .sort((prev, next) => (prev.sortOrder > next.sortOrder ? 1 : -1))
  );

  const initialForm: ProductVariantPageFormData = {
    channelListing: channels,
    metadata: variant?.metadata?.map(mapMetadataItemToInput),
    privateMetadata: variant?.privateMetadata?.map(mapMetadataItemToInput),
    sku: variant?.sku || "",
    trackInventory: !!variant?.trackInventory,
    weight: variant?.weight?.value.toString() || ""
  };

  const handleSubmit = (data: ProductVariantPageFormData) => {
    const dataStocks = stocks.map(stock => stock.id);
    const variantStocks = variant.stocks.map(stock => stock.warehouse.id);
    const stockDiff = diff(variantStocks, dataStocks);
    const metadata = isMetadataModified ? data.metadata : undefined;
    const privateMetadata = isPrivateMetadataModified
      ? data.privateMetadata
      : undefined;

    onSubmit({
      ...data,
      addStocks: stocks.filter(stock =>
        stockDiff.added.some(addedStock => addedStock === stock.id)
      ),
      attributes,
      metadata,
      privateMetadata,
      removeStocks: stockDiff.removed,
      updateStocks: stocks.filter(
        stock => !stockDiff.added.some(addedStock => addedStock === stock.id)
      )
    });
  };

  return (
    <>
      <Container>
        <AppHeader onBack={onBack}>{variant?.product?.name}</AppHeader>
        <PageHeader title={header}>
          {variant?.product?.defaultVariant?.id !== variant?.id && (
            <ProductVariantSetDefault
              onSetDefaultVariant={onSetDefaultVariant}
            />
          )}
        </PageHeader>
        <Form initial={initialForm} onSubmit={handleSubmit} confirmLeave>
          {({ change, data, hasChanged, set, submit, triggerChange }) => {
            const handleAttributeChange: FormsetChange = (id, value) => {
              changeAttributeData(id, value);
              triggerChange();
            };

            const changeMetadata = makeMetadataChangeHandler(change);

            const handleChannelChange = createVariantChannelsChangeHandler(
              data,
              set,
              triggerChange
            );
            const formDisabled = data.channelListing?.some(
              channel =>
                validatePrice(channel.price) ||
                validateCostPrice(channel.costPrice)
            );
            return (
              <>
                <Grid variant="inverted">
                  <div>
                    <ProductVariantNavigation
                      current={variant ? variant.id : undefined}
                      defaultVariantId={defaultVariantId}
                      fallbackThumbnail={maybe(
                        () => variant.product.thumbnail.url
                      )}
                      variants={maybe(() => variant.product.variants)}
                      onAdd={onAdd}
                      onRowClick={(variantId: string) => {
                        if (variant) {
                          return onVariantClick(variantId);
                        }
                      }}
                      onReorder={onVariantReorder}
                    />
                  </div>
                  <div>
                    <ProductVariantAttributes
                      attributes={attributes}
                      disabled={loading}
                      errors={errors}
                      onChange={handleAttributeChange}
                    />
                    <CardSpacer />
                    <ProductVariantImages
                      disabled={loading}
                      images={images}
                      placeholderImage={placeholderImage}
                      onImageAdd={toggleModal}
                    />
                    <CardSpacer />
                    <ProductVariantPrice
                      ProductVariantChannelListings={data.channelListing}
                      errors={channelErrors}
                      loading={loading}
                      onChange={handleChannelChange}
                    />
                    <CardSpacer />
                    <ProductShipping
                      data={data}
                      disabled={loading}
                      errors={errors}
                      weightUnit={variant?.weight?.unit || defaultWeightUnit}
                      onChange={change}
                    />
                    <CardSpacer />
                    <ProductStocks
                      data={data}
                      disabled={loading}
                      hasVariants={true}
                      errors={errors}
                      stocks={stocks}
                      warehouses={warehouses}
                      onChange={(id, value) => {
                        triggerChange();
                        changeStockData(id, value);
                      }}
                      onFormDataChange={change}
                      onWarehouseStockAdd={id => {
                        triggerChange();
                        addStock({
                          data: null,
                          id,
                          label: warehouses.find(
                            warehouse => warehouse.id === id
                          ).name,
                          value: "0"
                        });
                      }}
                      onWarehouseStockDelete={id => {
                        triggerChange();
                        removeStock(id);
                      }}
                      onWarehouseConfigure={onWarehouseConfigure}
                    />
                    <CardSpacer />
                    <Metadata data={data} onChange={changeMetadata} />
                  </div>
                </Grid>
                <SaveButtonBar
                  disabled={loading || formDisabled || !hasChanged}
                  state={saveButtonBarState}
                  onCancel={onBack}
                  onDelete={onDelete}
                  onSave={submit}
                />
              </>
            );
          }}
        </Form>
      </Container>
      {variant && (
        <ProductVariantImageSelectDialog
          onClose={toggleModal}
          onImageSelect={onImageSelect}
          open={isModalOpened}
          images={productImages}
          selectedImages={maybe(() => variant.images.map(image => image.id))}
        />
      )}
    </>
  );
};
ProductVariantPage.displayName = "ProductVariantPage";
export default ProductVariantPage;
