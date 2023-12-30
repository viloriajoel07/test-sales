"use server";

import { z } from "zod";
import { sql } from "@vercel/postgres";
import { ProductItem } from "@/types/sales";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const SaleSchema = z.object({
  client: z.number(),
  supplier: z.number(),
  product: z.number(),
});

type createSale = {
  client: number;
  branchOfficeID: number;
  products: ProductItem[];
  total: number;
};

// TODO: Refactorizar
export const createSale = async (
  formData: createSale
  //   products: ProductItem[]
) => {
  try {
    const {
      client: rutClient,
      branchOfficeID: idSucursal,
      products,
      total,
    } = formData;

    const response = await sql`
      INSERT INTO sales (rutClient, idSucursal, total) VALUES (${rutClient}, ${idSucursal}, ${total}) RETURNING id
    `;

    const idSale = response.rows[0].id;

    products.map(async (product) => {
      const { idProduct, quantity, subtotal } = product;

      await sql`
        INSERT INTO productsSold (saleId, productId, amount, subtotal) VALUES (${idSale}, ${idProduct}, ${quantity}, ${subtotal})
      `;
    });

    revalidatePath("/auth");
    redirect("/auth");
    return {
      status: "ok",
      message: "Venta creada correctamente",
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getProduct = async (id: number) => {
  try {
    const products = await sql`
      SELECT (id, name, price) FROM products WHERE id = ${id}
    `;

    const rows = products.rows;

    const rowString = rows[0].row;
    const rowArray = rowString.slice(1, -1).split(",");

    const parsedObject = {
      id: parseInt(rowArray[0], 10),
      name: rowArray[1].replace(/"/g, ""),
      price: parseFloat(rowArray[2]),
    };

    return parsedObject;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
