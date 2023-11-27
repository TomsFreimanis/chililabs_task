
import React from "react";
import Link from "next/link";

const Home: React.FC = () => {
  return (
    <div className="bg-gradient-to-b from-white to-gray-200 min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to My Products App</h1>
        <p className="text-green-600 underline m-4">
          <Link className="text-2xl" href="/product-list">
            Explore our amazing products on the Product List page
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Home;
