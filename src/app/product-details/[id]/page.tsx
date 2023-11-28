"use client";
import { useEffect, useState } from "react";
import getProduct from "../../../../lib/getProduct";
import Link from "next/link";

type Params = {
  params: {
    id: string;
  };
};

export default function ProductPage({ params: { id } }: Params) {
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getProduct(id);
        const productsData: Product[] = response.products;

        const foundProduct = productsData.find((p) => p.id === Number(id));

        if (foundProduct) {
          setProduct(foundProduct);
        } else {
          console.error(`Product with ID ${id} not found`);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div className="max-w-2xl mx-auto mt-8 p-4 md:p-8 border-2 bg-gradient-to-l from-slate-100 to-slate-100 text-slate-600 rounded shadow hover:shadow-lg">
      {product ? (
        <div>
          <h2 className="text-4xl font-bold mb-3 text-center text-green-500 ">
            {product.name}
          </h2>

          <p className="text-xl mb-2 text-center text-green-600">
            <span className="font-bold text-gray-600">Category:</span>{" "}
            {product.category}
          </p>
          <p className="m-2 text-center text-gray-700 font-bold text-lg">
            <span className="font-semibold">Price:</span> {product.price}{" "}
            {product.currency}
          </p>
        </div>
      ) : (
        <p className="text-gray-600 text-center">Loading...</p>
      )}

      {product && (
        <div className="mt-8">
          <h3 className="text-3xl font-semibold mb-3 text-center text-gray-950">
            Product Description
          </h3>
          <p className="text-gray-600 text-center text-xl">{product.description}</p>
        </div>
      )}

      <div className="mt-8 text-center text-gray-600">
        <p>
          <Link
            className="underline text-green-500 font-bold"
            href="/product-list"
          >
            Go back to Product List
          </Link>
        </p>
      </div>
    </div>
  );
}
