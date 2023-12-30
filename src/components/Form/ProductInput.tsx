import React from "react";
import { Input, InputSelect } from "@/components";
import { SelectOption } from "@/types/sales";

type ProductInputProps = {
  data: SelectOption[];
  idInput: string;
  currentProductSelected: (id: string) => void;
};

const ProductInput = ({
  data,
  idInput,
  currentProductSelected,
}: ProductInputProps) => {
  return (
    <InputSelect
      required
      label="Name"
      hasDefaultValue={false}
      className="flex-grow"
      idSelected={currentProductSelected}
      listOptions={data}
      contentClassName="!w-full"
      name={`nameInput-${idInput}`}
    />
  );
};

export default ProductInput;
