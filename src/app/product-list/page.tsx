"use client";

import { useState, useEffect } from "react";
import getAllProducts from "@lib/getAllProducts";
import Link from "next/link";
import Skeleton from 'react-loading-skeleton';

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [productsPerPage] = useState<number>(9);
  const [loading, setLoading] = useState<boolean>(true); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllProducts();
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
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
    <section className="container mx-auto mt-12 p-4 md:p-8">
      <h2 className="text-4xl font-bold mb-4 text-center text-black pt-4">Product List</h2>

      <div className="flex justify-center mb-4">
        <input
          type="text"
          placeholder="Search by product name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-3 border border-gray-600 rounded text-center w-3/4 md:w-1/2 lg:w-1/3"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {loading ? (
          Array.from({ length: productsPerPage }).map((_, index) => (
            <div key={index} className="bg-gradient-to-l from-slate-300 to-slate-100 p-4 rounded shadow-md border-2 animate-pulse">
              <Skeleton height={60} />
              <Skeleton height={20} width={200} />
              <Skeleton height={20} width={100} />
              <Skeleton height={20} width={100} />
            </div>
          ))
        ) : (
          currentProducts.map((product) => (
            <Link legacyBehavior key={product.id} href={`/product-details/${product.id}`}>
              <a className="w-full bg-gradient-to-l from-slate-100 to-slate-100 text-slate-400 border border-slate-300 p-4 rounded-lg shadow-md hover:bg-gray-100 transform transition-transform hover:scale-105">
                <div className="text-2xl font-bold text-green-500 capitalize mb-2 text-center">
                  {product.name}
                </div>
                <p className="text-xl mb-2 text-center text-green-600">
            <span className="font-bold text-gray-900">Category:</span> {product.category}
          </p>
                <div className="mb-2 text-center">
                  <p className="text-gray-700 font-bold text-lg">
                    <span className="font-semibold">Price:</span> {product.price} {product.currency}
                  </p>
                </div>
              </a>
            </Link>
          ))
        )}
      </div>

      <div className="mt-8 text-center">
        <ul className="flex justify-center">
          {Array.from({
            length: Math.ceil(filteredProducts.length / productsPerPage),
          }).map((_, index) => (
            <li
              key={index}
              onClick={() => paginate(index + 1)}
              className={`cursor-pointer px-3 py-1 ${
                currentPage === index + 1 ? "bg-gray-800 text-white" : "bg-gray-300"
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