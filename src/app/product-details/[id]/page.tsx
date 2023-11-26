"use client";
import { useEffect, useState } from "react";
import getProduct from "@/lib/getProduct";
import Link from "next/link";
// Type for the dynamic route params
type Params = {
  params: {
    id: string;
  };
};

// Component to display product details
export default function ProductPage({ params: { id } }: Params) {
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getProduct(id);
        const productsData: Product[] = response.products;

        // Find the product with the matching ID
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
    <div className="max-w-xl mx-auto mt-8 p-6 border-2 bg-white rounded shadow hover:shadow-lg">
      <h1 className="text-4xl font-bold mb-6">About Product</h1>
      {product ? (
        <div>
          <h2 className="text-3xl font-bold mb-3">{product.name}</h2>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <p className="text-lg mb-2">
            <span className="font-bold">Price:</span> {product.price} {product.currency}
          </p>
          <p className="text-lg mb-2">
            <span className="font-bold">Category:</span> {product.category}
          </p>
        </div>
      ) : (
        <p className="text-gray-600">Loading...</p>
      )}

      {product && (
        <div className="mt-8">
          <h3 className="text-2xl font-semibold mb-3">Product Description</h3>
          <p className="text-gray-600">{product.description}</p>
        </div>
      )}

      {/* Footer with link to go back to product list */}
      <div className="mt-8 text-center text-gray-600">
        <p>
          <Link className="underline text-green-600 font-bold" href="/product-list">
            Go back to Product List
          </Link>
        </p>
      </div>
    </div>
  );
};
