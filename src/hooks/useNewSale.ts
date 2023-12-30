import { useEffect, useState } from "react";

import { generateRandomProducts } from "@/helpers/getData";

import type { ProductItem } from "@/types/sales";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

// manages the create module logic
// TODO: SAVE PRODUCT
export const useNewSale = () => {
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [total, setTotal] = useState(0);

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const addProduct = () => {
    // add default values
    setProducts([
      ...products,
      {
        id: products[products.length - 1]?.id + 1 || 1,
        name: "",
      },
    ]);
  };

  const removeProduct = (id: number) => {
    // remove product by id
    setProducts(products.filter((product) => product.id !== id));
  };

  const handleProducts = (values: ProductItem) => {
    console.log(values);

    // update product
    setProducts((prev) => {
      const updatedProducts = prev.map((product) => {
        if (product.id === values.id) {
          return {
            ...product,
            idProduct: values.idProduct,
            name: values.name,
            quantity: values.quantity,
            price: values.price,
            subtotal: values.subtotal,
          };
        }
        return product;
      });

      return updatedProducts;
    });
  };

  useEffect(() => {
    addProduct();
  }, [addProduct]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    const total = products.reduce((prev, current) => {
      return prev + (current.subtotal ?? 0);
    }, 0);
    setTotal(total);

    params.set("total", JSON.stringify(total));
    params.set("products", JSON.stringify(products));
    replace(`${pathname}?${params.toString()}`);
  }, [products, pathname, replace, searchParams]);

  return {
    products,
    total,
    addProduct,
    removeProduct,
    handleProducts,
  };
};
