"use client";

import React from "react";

import { Button, DetailForm, Input } from "@/components";
import SectionsForm from "./SectionsForm";

import type { ProductItem, SelectOption } from "@/types/sales";
import { useNewSale } from "@/hooks/useNewSale";

type DetailSectionProps = {
  productItems: SelectOption[];
  productSelected?: ProductItem;
};

const DetailSection = ({
  productItems,
  productSelected,
}: DetailSectionProps) => {
  const { addProduct, handleProducts, products, removeProduct, total } =
    useNewSale();

  return (
    <SectionsForm title="Details">
      <input type="hidden" name="Products" value={JSON.stringify(products)} />

      <div className="w-full flex flex-col justify-end">
        {products.map((product) => (
          <DetailForm
            key={product.id}
            productItems={productItems}
            onDeleteCurrent={removeProduct}
            data={product}
            setProducts={handleProducts}
          />
        ))}
        <div className="flex flex-col-reverse sm:flex-row justify-between mt-4 px-6 lg:px-0">
          <Button className="!w-full lg:!w-fit mt-6" onClick={addProduct}>
            Add
          </Button>
          <div className="flex-grow flex justify-end lg:pr-16">
            <Input
              label="Total"
              value={total}
              name="total"
              readOnly
              contentClassName="!w-full lg:!w-fit"
              className="flex-1"
            />
          </div>
        </div>
      </div>
    </SectionsForm>
  );
};

export default DetailSection;
