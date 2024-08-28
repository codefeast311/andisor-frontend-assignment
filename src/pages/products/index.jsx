import React, { useEffect, useState } from "react";
import ProductHeader from "./components/header";
import products_data from "../../constants/dummy-api.json";
import ProductsContent from "./components/main-content";

const Products = () => {
  const [allProducts, setAllProducts] = useState([]);

  // Fetch data from localStorage on mount
  useEffect(() => {
    const storedProducts = localStorage.getItem("products");

    if (storedProducts) {
      setAllProducts(JSON.parse(storedProducts));
    } else {
      // No data in localStorage, so save initial data
      setAllProducts(products_data);
      localStorage.setItem("products", JSON.stringify(products_data));
    }
  }, []);

  // Update localStorage whenever products data changes
  useEffect(() => {
    if (allProducts.length > 0) {
      localStorage.setItem("products", JSON.stringify(allProducts));
    }
  }, [allProducts]);

  return (
    <div className="flex flex-col gap-4 p-4 bg-gray-100 min-h-screen max-w-[1920px] mx-auto">
      <ProductHeader />
      <ProductsContent products={allProducts} setProducts={setAllProducts} />
    </div>
  );
};

export default Products;
