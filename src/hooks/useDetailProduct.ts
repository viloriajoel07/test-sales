import { useEffect, useState } from "react";
import type { ProductItem } from "@/types/sales";

export const useDetailProduct = (data: ProductItem) => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [subtotal, setSubtotal] = useState("");

  const getSubtotal = () => {
    if (quantity === "" || price === "") return setSubtotal("");
    const result = Number(quantity) * Number(price);
    setSubtotal(String(result) ?? "");
  };

  useEffect(() => {
    getSubtotal();
  }, [quantity, price]);

  useEffect(() => {
    // set initial values
    setName(data.name);
    setQuantity(String(data.quantity ?? ""));
    setPrice(String(data.price ?? ""));
    setSubtotal(String(data.subtotal ?? ""));
  }, []);

  return {
    id,
    setId,
    setName,
    name,
    setQuantity,
    quantity,
    setPrice,
    price,
    subtotal,
  };
};
