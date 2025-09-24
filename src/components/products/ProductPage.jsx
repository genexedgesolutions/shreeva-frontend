import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { apiConfig } from "@/config/apiConfig";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch Products from API
  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        `${apiConfig.baseURL}/products/get-all-product`
      );
      setProducts(response.data.products); // Store products in state
    } catch (error) {
      console.error("Error fetching products:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Our Products</h2>

      {loading ? (
        <p>Loading products...</p>
      ) : products.length === 0 ? (
        <p>No products available.</p>
      ) : (
        <div style={{ display: "flex" }}>
          {products.map((product) => (
            <Link to={`/product-detail/${product._id}`} key={product._id}>
              <div
                style={{
                  width: "230px",
                  height: "450px",
                  border: "1px solid black",
                  textAlign: "center",
                  margin: "20px 20px ",
                }}
              >
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
                <h3 className="text-lg font-bold">{product.name}</h3>
                <p className="text-gray-600">{product.brand}</p>
                <p className="text-gray-800 font-semibold">₹{product.price}</p>
                <button
                  style={{ marginLeft: "50px" }}
                  className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Add to Cart
                </button>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
