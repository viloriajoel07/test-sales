import React from "react";

import { getAllSales } from "@/services/data";

import { Input, SectionsForm, List } from "@/components";
import { InputSearch } from "@/components/InputSearch";

const SalesPage = async ({
  searchParams,
}: {
  searchParams: {
    search?: string;
  };
}) => {
  const sales = await getAllSales(searchParams?.search ?? "");

  return (
    <SectionsForm title="Lista de ventas">
      <div className="flex flex-col w-full justify-end items-end">
        <InputSearch
          placeholder="Buscar"
          label="Buscar venta"
          contentClassName="!w-fit items-end"
          name="search"
        />
        <List sales={sales} />
      </div>
    </SectionsForm>
  );
};

export default SalesPage;
