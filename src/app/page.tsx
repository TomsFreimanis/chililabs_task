import React from "react";
import Link from "next/link";

const Home: React.FC = () => {
  return (
    <div className="bg-gradient-to-b from-white to-gray-200 min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to My Products App</h1>
        <p className="p-4">
          <Link legacyBehavior href="/product-list">
            <button className="relative overflow-hidden w-[180px] h-[60px] bg-gradient-to-r from-green-500 to-[#009b49] text-white rounded-xl cursor-pointer transition-all duration-500 ease-in-out shadow-md hover:scale-105 hover:shadow-lg before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-[#009b49] before:to-[rgb(105,184,141)] before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-xl hover:before:left-0">
              Explore Products
            </button>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Home;
