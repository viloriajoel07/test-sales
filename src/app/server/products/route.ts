// Route for get product by id

import { sql } from "@vercel/postgres";
import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  // get params
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  // get product from db
  const product = await sql`SELECT * FROM products WHERE id = ${id}`;
  1;
  // console.log(product.rows[0]);

  return NextResponse.json(product.rows[0]);
}
