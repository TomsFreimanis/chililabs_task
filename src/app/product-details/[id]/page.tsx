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
    <div className="max-w-2xl mx-auto mt-8 p-6 border-2 bg-gradient-to-l from-slate-300 to-slate-100 text-slate-600 rounded shadow hover:shadow-lg">
     
      {product ? (
        <div>
          <h2 className="text-4xl font-bold mb-3 text-center">{product.name}</h2>
         
          <p className="text-xl mb-2 text-center">
            <span className="font-bold">Price:</span> {product.price} {product.currency}
          </p>
          <p className="text-xl mb-2 text-center">
            <span className="font-bold">Category:</span> {product.category}
          </p>
        </div>
      ) : (
        <p className="text-gray-600 text-center">Loading...</p>
      )}
  
      {product && (
        <div className="mt-8">
          <h3 className="text-3xl font-semibold mb-3 text-center">Product Description</h3>
          <p className="text-gray-600 text-center">{product.description}</p>
        </div>
      )}
  
      <div className="mt-8 text-center text-gray-600">
        <p>
          <Link className="underline text-green-500 font-bold" href="/product-list">
            Go back to Product List
          </Link>
        </p>
      </div>
    </div>
  );
  
      }