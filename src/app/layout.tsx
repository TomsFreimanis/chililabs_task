import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
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
        <nav className="text-black bg-green-500 p-8">
          <div className="container mx-auto flex justify-between items-center">
            <Link legacyBehavior href="/">
              <a className="text-2xl flex items-center">
                <FontAwesomeIcon icon={faHome} className="h-8 w-8 mr-2" />
              </a>
            </Link>
          </div>
        </nav>

        <main>{children}</main>
      </body>
    </html>
  );
}
