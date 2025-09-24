import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { apiConfig } from "@/config/apiConfig";

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(
          `${apiConfig.baseURL}/products/get-single-product/${id}`
        );
        setProduct(response?.data?.product);
      } catch (error) {
        console.error("Error fetching product details:", error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProductDetails();
  }, [id]);

  if (loading) {
    return <p className="text-center text-xl">Loading...</p>;
  }

  if (!product) {
    return <p className="text-center text-xl">Product not found.</p>;
  }

  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="flex gap-2 mt-3">
            {product.images.map((img, index) => (
              <img
                style={{ width: "230px", height: "200px" }}
                key={index}
                src={img}
                alt={product.name}
                width="100"
                className="w-full h-40 object-cover mb-2 rounded-md"
              />
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-3xl font-bold">{product.name}</h2>
          <p className="text-gray-600 text-lg">{product.brand}</p>
          <p className="text-gray-800 text-2xl font-semibold my-3">
            ₹{product.price}
          </p>
          <p className="text-gray-700">{product.description}</p>
          <p className="text-green-600 mt-2">
            {product.stock > 0
              ? `In Stock (${product.stock} available)`
              : "Out of Stock"}
          </p>

          <div className="flex gap-2 mt-4">
            {product.shades?.map((shade, index) => (
              <div
                key={index}
                className="w-8 h-8 rounded-full border-2"
                style={{ backgroundColor: shade.hexCode }}
              ></div>
            ))}
          </div>

          <button className="mt-5 bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
