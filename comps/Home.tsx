"use client";
import React, { useEffect, useMemo, useState } from "react";
import { BannerDataTypes, ProductsTypes } from "../app/page";
import FooterBanner from "../comps/FooterBanner";
import MainBanner from "./MainBanner";
import Products from "../app/Products";

interface HomeProps {
  products: ProductsTypes[];
  bannerData: BannerDataTypes[];
}

/** Robust price parser (handles number or string like "2999" or "¥2,999") */
const parsePrice = (value: any): number => {
  if (value == null) return 0;
  if (typeof value === "number") return value;
  if (typeof value === "string") {
    // remove non-numeric characters except dot/minus
    const cleaned = value.replace(/[^0-9.-]+/g, "");
    const n = parseFloat(cleaned);
    return Number.isFinite(n) ? n : 0;
  }
  const n = Number(value);
  return Number.isFinite(n) ? n : 0;
};

const Home = ({ products = [], bannerData = [] }: HomeProps) => {
  const [sortOrder, setSortOrder] = useState<"" | "low" | "high">("");

  // Memoize sorted list so it's recalculated only when inputs change
  const sortedProducts = useMemo(() => {
    if (!products || products.length === 0) return [];

    const copy = [...products]; // clone so we don't mutate props
    if (sortOrder === "low") {
      return copy.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
    }
    if (sortOrder === "high") {
      return copy.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
    }
    return copy; // default order from backend
  }, [products, sortOrder]);

  return (
    <main>
      {/* MAIN BANNER */}
      <MainBanner banner={bannerData[0]} />

      <section className="mb-4 flex flex-col items-center">
        <h1 className="headTitle px-8 py-4 sm:py-2 sm:text-4xl text-2xl text-secondary font-sans font-extrabold sm:rounded-t-3xl">
          Best Selling Headphones
        </h1>

        {/* SORT DROPDOWN */}
        <div className="mt-2">
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as "" | "low" | "high")}
            className="border px-3 py-2 rounded-md"
            aria-label="Sort products by price"
          >
            <option value="">Default order</option>
            <option value="low">Price: Low to High</option>
            <option value="high">Price: High to Low</option>
          </select>
        </div>
      </section>

      {/* SHOW PRODUCTS (3 x 4 grid as requested earlier) */}
      <section className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-3 lg:mx-20 overflow-hidden gap-4">
        {sortedProducts.map((product) => (
          // NOTE: see important comment below if this still doesn't reorder visually
          <Products key={product._id} products={product} />
        ))}
      </section>

      {/* FOOTER BANNER */}
      <FooterBanner bannerData={bannerData && bannerData[1]} />
    </main>
  );
};

export default Home;
