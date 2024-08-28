import React from "react";
import AddIcon from "@mui/icons-material/Add";
import { Extension, IosShare } from "@mui/icons-material";
import { Divider } from "@mui/material";

const ProductHeader = () => {
  return (
    <>
      <div className="flex justify-between items-center  ">
        <div className="flex gap-4 items-center ">
          <h3 className="text-2xl font-semibold text-black">Inventory</h3>
          <h3 className="text-2xl font-semibold text-gray-500">Products</h3>
          <h3 className="text-2xl font-semibold text-gray-500">Analytics</h3>
        </div>

        <div className="flex gap-4 items-center">
          <button className="bg-blue-700 text-white px-4 py-2 rounded-full flex gap-2 hover:opacity-75">
            <AddIcon />
            Add New Product
          </button>

          <button className="flex gap-2 hover:opacity-75">
            <Extension />
            Import Data
          </button>

          <button className="flex gap-2 hover:opacity-75">
            <IosShare />
            Export Data
          </button>
        </div>
      </div>
      <Divider />
    </>
  );
};

export default ProductHeader;
