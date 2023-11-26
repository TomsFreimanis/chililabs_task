"use client";

import { useState, useEffect } from "react";
import getAllProducts from "@/lib/getAllProducts";
import Link from "next/link";

export default function UsersPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [productsPerPage] = useState<number>(9);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllProducts();
      setProducts(data);
      setFilteredProducts(data);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
      setCurrentPage(1);
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, products]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);


  return (
    <section className="container mx-auto mt-8">
      <h2 className="text-4xl font-bold mb-4 text-center pt-4">Product List</h2>

      <div className="flex justify-center">
        <input
          type="text"
          placeholder="Search by product name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-3 mb-4 border border-gray-600 rounded text-center w-3/4 md:w-1/2 lg:w-1/3"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentProducts.map((product) => (
          <Link legacyBehavior key={product.id} href={`/product-details/${product.id}`}>
            <a className="bg-white p-4 rounded shadow-md border-2 hover:bg-gray-100 block">
              <h3 className="text-xl font-semibold mb-2 text-center">{product.name}</h3>
              <p className="text-gray-600 mb-2 text-center">{product.category}</p>
              <div className="mt-4 text-center">
                <p className="text-green-600 font-bold">
                  {product.price} {product.currency}
                </p>
              </div>
            </a>
          </Link>
        ))}
      </div>

      <div className="mt-8 text-center">
        <ul className="flex justify-center"> {/* Added flex and justify-center */}
          {Array.from({
            length: Math.ceil(filteredProducts.length / productsPerPage),
          }).map((_, index) => (
            <li
              key={index}
              onClick={() => paginate(index + 1)}
              className={`cursor-pointer px-3 py-1 ${
                currentPage === index + 1
                  ? "bg-gray-800 text-white"
                  : "bg-gray-300"
              }`}
            >
              {index + 1}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
