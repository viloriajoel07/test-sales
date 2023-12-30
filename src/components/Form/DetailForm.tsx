"use client";

import { useEffect } from "react";
import { IconX } from "@tabler/icons-react";

import { Button, Input } from "@/components";
import { useDetailProduct } from "@/hooks/useDetailProduct";

import type { ProductItem, SelectOption } from "@/types/sales";
import ProductInput from "./ProductInput";
import { getProduct } from "@/lib/actions";

type DetailFormProps = {
  data: ProductItem;
  setProducts: (values: ProductItem) => void;
  onDeleteCurrent: (id: number) => void;
  productItems: SelectOption[];
};

const DetailForm = ({
  onDeleteCurrent,
  data,
  setProducts,
  productItems,
}: DetailFormProps) => {
  const {
    name,
    quantity,
    setId,
    id: idProduct,
    setQuantity,
    price,
    setPrice,
    subtotal,
  } = useDetailProduct(data);

  useEffect(() => {
    setProducts({
      id: data.id,
      idProduct: Number(idProduct),
      name: name,
      quantity: Number(quantity ?? undefined),
      price: Number(price ?? undefined),
      subtotal: Number(subtotal ?? undefined),
    });
  }, [name, quantity, price, subtotal, idProduct]);

  const handleValues = (response: any) => {
    setPrice(response.price);
    setProducts({
      id: data.id,
      idProduct: Number(response.id),
      name: name,
      quantity: Number(quantity),
      price: response.price * 100,
      subtotal: Number(subtotal ?? undefined),
    });
  };

  return (
    <div className="flex gap-4 mt-2 flex-col lg:flex-row border rounded-lg lg:border-none p-6 lg:p-0">
      <div className="w-full">
        <ProductInput
          data={productItems}
          idInput={String(data.id)}
          currentProductSelected={async (id) => {
            const response = await getProduct(Number(id));
            handleValues(response);
            setId(id);
          }}
        />
      </div>
      <div className="flex flex-col lg:flex-row gap-4 w-full md:w-auto flex-grow">
        <Input
          required
          label="Quantity"
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="flex-1"
          contentClassName="!w-full md:w-fit"
        />
        <Input
          readOnly
          label="Price"
          type="number"
          name={`price-${data.id}`}
          value={Number(price).toLocaleString()}
          onChange={(e) => setPrice(e.target.value)}
          className="flex-1"
          contentClassName="!w-full md:w-fit"
        />
        <Input
          readOnly
          label="Subtotal"
          name={`subtotal-${data.id}`}
          value={Number(subtotal).toLocaleString()}
          className="flex-1"
          contentClassName="!w-full md:w-fit"
        />
      </div>
      <Button
        className="!px-3 h-fit flex justify-center"
        onClick={() => onDeleteCurrent(data.id)}
      >
        <IconX size={23} />
      </Button>
    </div>
  );
};

export default DetailForm;
