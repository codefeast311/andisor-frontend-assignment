import React, { useState } from "react";
import Edit from "@mui/icons-material/Edit";
import Save from "@mui/icons-material/Save";
import Cancel from "@mui/icons-material/Cancel";

const ProductsContent = ({ products, setProducts }) => {
  // State to track expanded products, primary variants, and editing states
  const [expandedProducts, setExpandedProducts] = useState({});
  const [expandedPrimaryVariants, setExpandedPrimaryVariants] = useState({});
  const [editingProduct, setEditingProduct] = useState(null);
  const [editingVariant, setEditingVariant] = useState(null);
  const [editingSecondaryVariant, setEditingSecondaryVariant] = useState(null);

  const toggleProductExpand = (index) => {
    setExpandedProducts((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const togglePrimaryVariantExpand = (productIndex, variantIndex) => {
    const key = `${productIndex}-${variantIndex}`;
    setExpandedPrimaryVariants((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleEditProduct = (index) => {
    setEditingProduct(index);
  };

  const handleCancelProduct = () => {
    setEditingProduct(null);
  };

  const handleSaveProduct = (index) => {
    // Save product data
    setEditingProduct(null);
  };

  const handleChangeProduct = (e, index) => {
    const { name, value } = e.target;
    const updatedProducts = [...products];
    updatedProducts[index] = { ...updatedProducts[index], [name]: value };
    setProducts(updatedProducts);
  };

  const handleEditVariant = (productIndex, variantIndex) => {
    setEditingVariant({ productIndex, variantIndex });
  };

  const handleCancelVariant = () => {
    setEditingVariant(null);
  };

  const handleSaveVariant = (productIndex, variantIndex) => {
    // Save variant data
    setEditingVariant(null);
  };

  const handleChangeVariant = (e, productIndex, variantIndex) => {
    const { name, value } = e.target;
    const updatedProducts = [...products];
    updatedProducts[productIndex].primary_variants[variantIndex] = {
      ...updatedProducts[productIndex].primary_variants[variantIndex],
      [name]: value,
    };
    setProducts(updatedProducts);
  };

  const handleEditSecondaryVariant = (productIndex, variantIndex, secIndex) => {
    setEditingSecondaryVariant({ productIndex, variantIndex, secIndex });
  };

  const handleCancelSecondaryVariant = () => {
    setEditingSecondaryVariant(null);
  };

  const handleSaveSecondaryVariant = (productIndex, variantIndex, secIndex) => {
    // Save secondary variant data
    setEditingSecondaryVariant(null);
  };

  const handleChangeSecondaryVariant = (
    e,
    productIndex,
    variantIndex,
    secIndex
  ) => {
    const { name, value } = e.target;
    const updatedProducts = [...products];
    updatedProducts[productIndex].primary_variants[
      variantIndex
    ].secondary_variants[secIndex] = {
      ...updatedProducts[productIndex].primary_variants[variantIndex]
        .secondary_variants[secIndex],
      [name]: value,
    };
    setProducts(updatedProducts);
  };

  return (
    <div className="md:p-4 overflow-scroll">
      <table className="min-w-full">
        <thead>
          <tr>
            <th className="py-2 px-4 text-left">Name</th>
            <th className="py-2 px-4 text-left">(WHS)</th>
            <th className="py-2 px-4 text-left">Discount</th>
            <th className="py-2 px-4 text-left">Color</th>
            <th className="py-2 px-4 text-left">Sizes</th>
            <th className="py-2 px-4 text-left">Inventory</th>
            <th className="py-2 px-4 text-left">Lead Time</th>
            {/* <th className="py-2 px-4 text-left">Actions</th> */}
          </tr>
        </thead>
        <tbody>
          {products.map((product, productIndex) => (
            <React.Fragment key={productIndex}>
              <tr
                className="text-sm hover:opacity-90 hover:bg-purple-200 cursor-pointer h-12"
                onClick={() =>
                  !editingProduct && toggleProductExpand(productIndex)
                }
              >
                <td className="py-2 px-4 flex gap-2 items-center">
                  <img
                    src={product?.image}
                    className="h-8 w-8 rounded-full"
                    alt="product"
                  />
                  {editingProduct === productIndex ? (
                    <input
                      type="text"
                      name="title"
                      value={product.title}
                      onChange={(e) => handleChangeProduct(e, productIndex)}
                      className="border rounded px-2 py-1"
                    />
                  ) : (
                    product?.title
                  )}
                  {editingProduct === productIndex ? (
                    <>
                      <button
                        className="text-green-700 hover:text-green-800 flex gap-1 items-center"
                        onClick={() => handleSaveProduct(productIndex)}
                      >
                        <Save fontSize="small" />
                        <span>Save</span>
                      </button>
                      <button
                        className="text-red-700 hover:text-red-800 flex gap-1 items-center"
                        onClick={handleCancelProduct}
                      >
                        <Cancel fontSize="small" />
                        <span>Cancel</span>
                      </button>
                    </>
                  ) : (
                    <button
                      className="text-blue-700 hover:text-blue-800 flex gap-1 items-center"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditProduct(productIndex);
                      }}
                    >
                      <Edit fontSize="small" />
                      <span>Edit</span>
                    </button>
                  )}
                </td>
                <td className="py-2 px-4">
                  {editingProduct === productIndex ? (
                    <input
                      type="text"
                      name="price"
                      value={product.price}
                      onChange={(e) => handleChangeProduct(e, productIndex)}
                      className="border rounded px-2 py-1"
                    />
                  ) : (
                    product?.price
                  )}
                </td>
                <td className="py-2 px-4">
                  {editingProduct === productIndex ? (
                    <input
                      type="text"
                      name="discountPercentage"
                      value={product.discountPercentage}
                      onChange={(e) => handleChangeProduct(e, productIndex)}
                      className="border rounded px-2 py-1"
                    />
                  ) : (
                    product?.discountPercentage
                  )}
                </td>
                <td className="py-2 px-4 flex gap-1">
                  {product?.primary_variants
                    .filter((item, index) => index < 2)
                    .map((item, index) => (
                      <div
                        key={index}
                        className="h-4 w-4 rounded-full"
                        style={{ backgroundColor: item.name.toLowerCase() }}
                      ></div>
                    ))}
                  <span>+{product?.primary_variants.length - 2}</span>
                </td>
                <td className="py-2 px-4">
                  {product?.primary_variants[0]?.secondary_variants
                    .filter((item, index) => index < 3)
                    .map((item, index) => (
                      <span key={index} className="mr-2">
                        {item.name.substring(0, 1)}
                      </span>
                    ))}
                  <span>
                    +
                    {product?.primary_variants[0]?.secondary_variants.length -
                      3}
                  </span>
                </td>
                <td className="py-2 px-4">
                  {editingProduct === productIndex ? (
                    <input
                      type="text"
                      name="inventory"
                      value={product.inventory}
                      onChange={(e) => handleChangeProduct(e, productIndex)}
                      className="border rounded px-2 py-1"
                    />
                  ) : (
                    product?.inventory
                  )}
                </td>
                <td className="py-2 px-4">
                  {editingProduct === productIndex ? (
                    <input
                      type="text"
                      name="leadTime"
                      value={product.leadTime}
                      onChange={(e) => handleChangeProduct(e, productIndex)}
                      className="border rounded px-2 py-1"
                    />
                  ) : (
                    product?.leadTime
                  )}
                </td>
              </tr>

              {expandedProducts[productIndex] && (
                <React.Fragment>
                  {product?.primary_variants.map((variant, variantIndex) => (
                    <React.Fragment key={variantIndex}>
                      <tr
                        className="text-sm hover:opacity-90 hover:bg-red-200 cursor-pointer h-12"
                        onClick={() =>
                          !editingVariant &&
                          togglePrimaryVariantExpand(productIndex, variantIndex)
                        }
                      >
                        <td className="py-2 px-4 pl-16">
                          {editingVariant?.productIndex === productIndex &&
                          editingVariant?.variantIndex === variantIndex ? (
                            <input
                              type="text"
                              name="name"
                              value={variant.name}
                              onChange={(e) =>
                                handleChangeVariant(
                                  e,
                                  productIndex,
                                  variantIndex
                                )
                              }
                              className="border rounded px-2 py-1"
                            />
                          ) : (
                            variant.name
                          )}
                        </td>
                        <td className="py-2 px-4">
                          {editingVariant?.productIndex === productIndex &&
                          editingVariant?.variantIndex === variantIndex ? (
                            <input
                              type="text"
                              name="price"
                              value={variant.price}
                              onChange={(e) =>
                                handleChangeVariant(
                                  e,
                                  productIndex,
                                  variantIndex
                                )
                              }
                              className="border rounded px-2 py-1"
                            />
                          ) : (
                            variant.price
                          )}
                        </td>
                        <td className="py-2 px-4">
                          {editingVariant?.productIndex === productIndex &&
                          editingVariant?.variantIndex === variantIndex ? (
                            <input
                              type="text"
                              name="discountPercentage"
                              value={variant.discountPercentage}
                              onChange={(e) =>
                                handleChangeVariant(
                                  e,
                                  productIndex,
                                  variantIndex
                                )
                              }
                              className="border rounded px-2 py-1"
                            />
                          ) : (
                            variant.discountPercentage
                          )}
                        </td>
                        <td className="py-2 px-4"></td>
                        <td className="py-2 px-4"></td>
                        <td className="py-2 px-4">
                          {editingVariant?.productIndex === productIndex &&
                          editingVariant?.variantIndex === variantIndex ? (
                            <input
                              type="text"
                              name="inventory"
                              value={variant.inventory}
                              onChange={(e) =>
                                handleChangeVariant(
                                  e,
                                  productIndex,
                                  variantIndex
                                )
                              }
                              className="border rounded px-2 py-1"
                            />
                          ) : (
                            variant.inventory
                          )}
                        </td>
                        <td className="py-2 px-4">
                          {editingVariant?.productIndex === productIndex &&
                          editingVariant?.variantIndex === variantIndex ? (
                            <input
                              type="text"
                              name="leadTime"
                              value={variant.leadTime}
                              onChange={(e) =>
                                handleChangeVariant(
                                  e,
                                  productIndex,
                                  variantIndex
                                )
                              }
                              className="border rounded px-2 py-1"
                            />
                          ) : (
                            variant.leadTime
                          )}
                        </td>
                        <td className="py-2 px-4">
                          {editingVariant?.productIndex === productIndex &&
                          editingVariant?.variantIndex === variantIndex ? (
                            <>
                              <button
                                className="text-green-700 hover:text-green-800 flex gap-1 items-center"
                                onClick={() =>
                                  handleSaveVariant(productIndex, variantIndex)
                                }
                              >
                                <Save fontSize="small" />
                                <span>Save</span>
                              </button>
                              <button
                                className="text-red-700 hover:text-red-800 flex gap-1 items-center"
                                onClick={handleCancelVariant}
                              >
                                <Cancel fontSize="small" />
                                <span>Cancel</span>
                              </button>
                            </>
                          ) : (
                            <button
                              className="text-blue-700 hover:text-blue-800 flex gap-1 items-center"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleEditVariant(productIndex, variantIndex);
                              }}
                            >
                              <Edit fontSize="small" />
                              <span>Edit</span>
                            </button>
                          )}
                        </td>
                      </tr>

                      {expandedPrimaryVariants[
                        `${productIndex}-${variantIndex}`
                      ] && (
                        <React.Fragment>
                          {variant.secondary_variants.map(
                            (secVariant, secIndex) => (
                              <tr
                                key={secIndex}
                                className="bg-gray-100 hover:bg-pink-200 cursor-pointer h-12"
                              >
                                <td className="py-2 px-4 col-span-8 pl-32">
                                  {editingSecondaryVariant?.productIndex ===
                                    productIndex &&
                                  editingSecondaryVariant?.variantIndex ===
                                    variantIndex &&
                                  editingSecondaryVariant?.secIndex ===
                                    secIndex ? (
                                    <input
                                      type="text"
                                      name="name"
                                      value={secVariant.name}
                                      onChange={(e) =>
                                        handleChangeSecondaryVariant(
                                          e,
                                          productIndex,
                                          variantIndex,
                                          secIndex
                                        )
                                      }
                                      className="border rounded px-2 py-1"
                                    />
                                  ) : (
                                    secVariant.name
                                  )}
                                </td>
                                <td className="py-2 px-4">
                                  {editingSecondaryVariant?.productIndex ===
                                    productIndex &&
                                  editingSecondaryVariant?.variantIndex ===
                                    variantIndex &&
                                  editingSecondaryVariant?.secIndex ===
                                    secIndex ? (
                                    <input
                                      type="text"
                                      name="price"
                                      value={secVariant.price}
                                      onChange={(e) =>
                                        handleChangeSecondaryVariant(
                                          e,
                                          productIndex,
                                          variantIndex,
                                          secIndex
                                        )
                                      }
                                      className="border rounded px-2 py-1"
                                    />
                                  ) : (
                                    secVariant.price
                                  )}
                                </td>
                                <td className="py-2 px-4">
                                  {editingSecondaryVariant?.productIndex ===
                                    productIndex &&
                                  editingSecondaryVariant?.variantIndex ===
                                    variantIndex &&
                                  editingSecondaryVariant?.secIndex ===
                                    secIndex ? (
                                    <input
                                      type="text"
                                      name="discountPercentage"
                                      value={secVariant.discountPercentage}
                                      onChange={(e) =>
                                        handleChangeSecondaryVariant(
                                          e,
                                          productIndex,
                                          variantIndex,
                                          secIndex
                                        )
                                      }
                                      className="border rounded px-2 py-1"
                                    />
                                  ) : (
                                    secVariant.discountPercentage
                                  )}
                                </td>
                                <td className="py-2 px-4"></td>
                                <td className="py-2 px-4"></td>
                                <td className="py-2 px-4">
                                  {editingSecondaryVariant?.productIndex ===
                                    productIndex &&
                                  editingSecondaryVariant?.variantIndex ===
                                    variantIndex &&
                                  editingSecondaryVariant?.secIndex ===
                                    secIndex ? (
                                    <input
                                      type="text"
                                      name="inventory"
                                      value={secVariant.inventory}
                                      onChange={(e) =>
                                        handleChangeSecondaryVariant(
                                          e,
                                          productIndex,
                                          variantIndex,
                                          secIndex
                                        )
                                      }
                                      className="border rounded px-2 py-1"
                                    />
                                  ) : (
                                    secVariant.inventory
                                  )}
                                </td>
                                <td className="py-2 px-4">
                                  {editingSecondaryVariant?.productIndex ===
                                    productIndex &&
                                  editingSecondaryVariant?.variantIndex ===
                                    variantIndex &&
                                  editingSecondaryVariant?.secIndex ===
                                    secIndex ? (
                                    <input
                                      type="text"
                                      name="leadTime"
                                      value={secVariant.leadTime}
                                      onChange={(e) =>
                                        handleChangeSecondaryVariant(
                                          e,
                                          productIndex,
                                          variantIndex,
                                          secIndex
                                        )
                                      }
                                      className="border rounded px-2 py-1"
                                    />
                                  ) : (
                                    secVariant.leadTime
                                  )}
                                </td>
                                <td className="py-2 px-4">
                                  {editingSecondaryVariant?.productIndex ===
                                    productIndex &&
                                  editingSecondaryVariant?.variantIndex ===
                                    variantIndex &&
                                  editingSecondaryVariant?.secIndex ===
                                    secIndex ? (
                                    <>
                                      <button
                                        className="text-green-700 hover:text-green-800 flex gap-1 items-center"
                                        onClick={() =>
                                          handleSaveSecondaryVariant(
                                            productIndex,
                                            variantIndex,
                                            secIndex
                                          )
                                        }
                                      >
                                        <Save fontSize="small" />
                                        <span>Save</span>
                                      </button>
                                      <button
                                        className="text-red-700 hover:text-red-800 flex gap-1 items-center"
                                        onClick={handleCancelSecondaryVariant}
                                      >
                                        <Cancel fontSize="small" />
                                        <span>Cancel</span>
                                      </button>
                                    </>
                                  ) : (
                                    <button
                                      className="text-blue-700 hover:text-blue-800 flex gap-1 items-center"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleEditSecondaryVariant(
                                          productIndex,
                                          variantIndex,
                                          secIndex
                                        );
                                      }}
                                    >
                                      <Edit fontSize="small" />
                                      <span>Edit</span>
                                    </button>
                                  )}
                                </td>
                              </tr>
                            )
                          )}
                        </React.Fragment>
                      )}
                    </React.Fragment>
                  ))}
                </React.Fragment>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductsContent;
