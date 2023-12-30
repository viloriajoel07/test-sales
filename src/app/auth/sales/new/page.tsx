import Image from "next/image";

// server
import { filteredProducts } from "@/services/data";
import { createSale } from "@/lib/actions";

import { Button } from "@/components";
import DocumentSection from "@/components/Sales/DocumentSection";
import DetailSection from "@/components/Sales/DetailSection";

import NewSaleImage from "@/assets/new_sale_ai.png";

const NewSalePage = async ({
  searchParams,
}: {
  searchParams?: {
    products?: string;
    nameProduct?: string;
    client?: string;
    total?: string;
    branchOffice?: string;
    branchOfficeValue?: string;
    clientValue?: string;
  };
}) => {
  const {
    products,
    nameProduct,
    client,
    total,
    branchOfficeValue,
    branchOffice: brOfficeQuery,
    clientValue,
  } = searchParams ?? {};

  const prodFiltered = await filteredProducts(nameProduct ?? "");

  const submitForm = async () => {
    "use server";
    const response = await createSale({
      client: Number(clientValue),
      branchOfficeID: Number(branchOfficeValue),
      products: JSON.parse(products ?? "[]"),
      total: Number(total),
    });
  };

  return (
    <div className="w-full">
      <header className="flex gap-6 items-center">
        <Image src={NewSaleImage} alt="New Sale Image" width={50} />
        <div className="flex flex-col gap-2 w-full">
          <h2 className="text-4xl font-bold text-slate-800">New Sale</h2>
          <hr className="bg-sky-600/40 h-1" />
        </div>
      </header>
      <form action={submitForm}>
        <DocumentSection
          branchOfficeSelected={branchOfficeValue ?? ""}
          branchOfficeQuery={brOfficeQuery ?? ""}
          clientQuery={client ?? ""}
        />
        <DetailSection productItems={prodFiltered} />
        <hr className="my-4" />
        <footer className="flex justify-end">
          <Button type="submit">Save</Button>
        </footer>
      </form>
    </div>
  );
};

export default NewSalePage;
