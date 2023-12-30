import React from "react";
import Link from "next/link";

import { Button, SectionsForm } from "@/components";
import DetailSection from "@/components/DetailSection";

import NewSaleImage from "@/assets/new_sale_ai.png";
import Image from "next/image";
import { getSaleInfo } from "@/services/data";

const saleInfo = {
  client: "pepe",
  branchOffice: "Argentina",
  curreny: "ARS",
  details: [
    {
      product: "Coca Cola",
      quantity: 2,
      price: 100,
      subtotal: 200,
    },
    {
      product: "Pepsi",
      quantity: 1,
      price: 120,
      subtotal: 120,
    },
  ],
  total: 320,
};

const DetailSale = async ({ params }: { params: { id: string } }) => {
  const saleInfo = await getSaleInfo(Number(params.id));

  return (
    <div className="flex flex-col gap-4 justify-center items-center w-full">
      <header className="flex gap-6 items-center w-full">
        <Image src={NewSaleImage} alt="New Sale Image" width={50} />
        <div className="flex flex-col gap-2 w-full">
          <h2 className="text-4xl font-bold text-slate-800">Sale Detail</h2>
          <hr className="bg-sky-600/40 h-1" />
        </div>
      </header>
      <div className="max-w-[40rem] w-full">
        <SectionsForm title="Detail Sale">
          <div className="grid md:grid-cols-4 w-full">
            <DetailSection title="Cliente" value={saleInfo.client} />
            <DetailSection
              title="Sucursal"
              value={saleInfo.details[0].branchoffice ?? 0}
            />
            <DetailSection title="Moneda" value={saleInfo.currency} />
            <DetailSection
              title="Total"
              value={`$ ${String(saleInfo.total)}`}
            />
          </div>
        </SectionsForm>
        <SectionsForm title="Products">
          <div className="w-full flex flex-col gap-4">
            {saleInfo.details.map((detail, index) => {
              return (
                <>
                  <div className="grid md:grid-cols-3 w-full">
                    <DetailSection title="Producto" value={detail.product} />
                    <DetailSection
                      title="Cantidad"
                      value={String(detail.amount)}
                    />
                    <DetailSection
                      title="Precio"
                      value={`$ ${String(detail.price)}`}
                    />
                  </div>
                  {index !== saleInfo.details.length - 1 && <hr />}
                </>
              );
            })}
          </div>
        </SectionsForm>
        <hr className="my-4" />
        <footer className="flex justify-end">
          <Link href="/auth">
            <Button>Volver</Button>
          </Link>
        </footer>
      </div>
    </div>
  );
};

export default DetailSale;
