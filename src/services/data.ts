import { sql } from "@vercel/postgres";
import type { ProductItem, SelectOption } from "@/types/sales";

export async function filteredClients(query: string) {
  try {
    const clients = await sql<SelectOption>`
      SELECT
        rut as id,
        name as value
      FROM clients
      WHERE name ILIKE ${`%${query}%`}
      ORDER BY name ASC
      LIMIT 20 
    `;

    return clients.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch clients.");
  }
}

export const getBranchOffice = async (
  query: string
): Promise<{
  data: SelectOption[];
}> => {
  try {
    const response = await sql<SelectOption>`
        SELECT id,
        name as value
        FROM sucursales
        WHERE name ILIKE ${`%${query}%`}
        ORDER BY name ASC
      `;

    return {
      data: response.rows,
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getCurrency = async (
  branchOfficeSelected: number
): Promise<{ currency: string }> => {
  try {
    if (!branchOfficeSelected) return { currency: "" };

    const response = await sql<{ currency: string }>`
      SELECT currency FROM sucursales WHERE id = ${branchOfficeSelected}
    `;

    return {
      currency: response.rows.length !== 0 ? response.rows[0].currency : "",
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const filteredProducts = async (query: string) => {
  try {
    const response = await sql<SelectOption>`
      SELECT id, name as value
      FROM products
      WHERE name ILIKE ${`%${query}%`}
      ORDER BY name ASC
    `;

    return response.rows;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getProduct = async (id: number): Promise<ProductItem> => {
  try {
    if (!id) return {} as ProductItem;

    const response = await sql<ProductItem>`
      SELECT id,
      name,
      price
      FROM products
      WHERE id = ${id}
    `;

    return response.rows[0];
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getAllSales = async (query: string) => {
  try {
    const response = await sql`
      SELECT
        sales.id,
        sales.total,
        sales.created_at,
        clients.name as client,
        sucursales.name as branchOffice
      FROM sales
      INNER JOIN clients ON sales.rutClient = clients.rut
      INNER JOIN sucursales ON sales.idSucursal = sucursales.id
      WHERE clients.name ILIKE ${`%${query}%`} OR
      sucursales.name ILIKE ${`%${query}%`}
      ORDER BY sales.created_at DESC
    `;

    return response.rows;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getSaleInfo = async (id: number) => {
  try {
    const detailSale = await sql`
      SELECT
        sales.id,
        sales.total,
        sales.created_at,
        clients.name as client,
        sucursales.name as branchOffice,
        sucursales.currency as currency
      FROM sales
      INNER JOIN clients ON sales.rutClient = clients.rut
      INNER JOIN sucursales ON sales.idSucursal = sucursales.id
      WHERE sales.id = ${id}
    `;

    const detailProducts = await sql`
    SELECT
        sales.id,
        products.name as product,
        products.price,
        productsSold.amount,
        sucursales.name as branchOffice
    FROM sales
    INNER JOIN productsSold ON sales.id = productsSold.saleId
    INNER JOIN products ON productsSold.productId = products.id
    INNER JOIN sucursales ON sales.idSucursal = sucursales.id
    WHERE sales.id = ${id}
`;

    const info = detailSale.rows[0];

    return {
      client: info.client,
      branchOffice: info.branchOffice,
      currency: info.currency,
      details: detailProducts.rows,
      total: info.total,
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};
