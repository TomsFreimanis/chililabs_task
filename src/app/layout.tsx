import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Front-end developer",
  description: "Chililabs-task",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Navigation Bar */}
        <nav className="bg-gray-800 text-white p-8">
          <div className="container mx-auto flex justify-between items-center">
            
            <Link className="text-2xl" href="/">
              Home
            </Link>
            <Link className="text-2xl" href="/product-list">
              Products
            </Link>
          </div>
        </nav>

        {/* Main Content */}
        <main>{children}</main>
      </body>
    </html>
  );
}
