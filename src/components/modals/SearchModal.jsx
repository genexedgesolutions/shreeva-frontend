
import { useEffect, useState } from "react";
import ProductCard1 from "../productCards/ProductCard1";
import useProducts from "@/hooks/useProducts";
import { getAllCategories } from "@/api/category";

export default function SearchModal() {
  const {products ,loading} = useProducts();
  const [categories, setCategories] = useState([]);
const [categoriesLoading, setCategoriesLoading] = useState(true);
useEffect(() => {
  const fetchCategories = async () => {
    try {
      const res = await getAllCategories(); // Adjust API path as needed
      setCategories(res.categories); // assuming API returns { categories: [...] }
    } catch (error) {
      console.error("Failed to fetch categories", error);
    } finally {
      setCategoriesLoading(false);
    }
  };

  fetchCategories();
}, []);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [loadedItems, setLoadedItems] = useState(products.slice(0, 8));

  const handleSearch = (query) => {
    if (!query) {
      setFilteredProducts(products);
      setLoadedItems(products.slice(0, 8));
      return;
    }

    const queryLower = query.toLowerCase();
    const filtered = products.filter((product) => {
      const categoryName =
        categories.find((cat) => cat._id === product.category)?.name || "";
      return (
        product.name.toLowerCase().includes(queryLower) ||
        categoryName.toLowerCase().includes(queryLower)
      );
    });

    setFilteredProducts(filtered);
    setLoadedItems(filtered.slice(0, 8));
  };

  return (
    <div className="modal fade modal-search" id="search">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="d-flex justify-content-between align-items-center">
            <h5>Search</h5>
            <span
              className="icon-close icon-close-popup"
              data-bs-dismiss="modal"
            />
          </div>
          <form
            className="form-search"
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch(searchQuery);
            }}
          >
            <fieldset className="text">
              <input
                type="text"
                placeholder="Searching..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                required
              />
            </fieldset>
            <button type="submit">
              <svg
                className="icon"
                width={20}
                height={20}
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
                  stroke="#181818"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M21.35 21.0004L17 16.6504"
                  stroke="#181818"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </form>

          {/* Feature Keywords */}
          <div>
            <h5 className="mb_16">Feature keywords Today</h5>
            <ul className="list-tags">
              {["Hair Care", "Skin Care"].map((keyword) => (
                <li key={keyword}>
                  <a
                    href="#"
                    className="radius-60 link"
                    onClick={(e) => {
                      e.preventDefault();
                      setSearchQuery(keyword);
                      handleSearch(keyword);
                    }}
                  >
                    {keyword}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Recently Viewed Products */}
          <div>
            <h6 className="mb_16">Recently viewed products</h6>
            <div className="tf-grid-layout tf-col-2 lg-col-3 xl-col-4">
              {loadedItems.map((product, i) => (
                <ProductCard1 product={product} key={i} />
              ))}
            </div>
          </div>

          {/* Load More Button */}
          {filteredProducts.length === loadedItems.length ? null : (
            <div
              className="wd-load view-more-button text-center"
              onClick={() => {
                setLoadedItems((prev) => [
                  ...prev,
                  ...filteredProducts.slice(prev.length, prev.length + 4),
                ]);
              }}
            >
              <button className="tf-loading btn-loadmore tf-btn btn-reset">
                <span className="text text-btn text-btn-uppercase">
                  Load more
                </span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
