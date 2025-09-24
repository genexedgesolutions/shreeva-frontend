import ProductCard1 from "@/components/productCards/ProductCard1";
import useProducts from "@/hooks/useProducts";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const tabItems = ["BESTSELLERS", "NEW LAUNCHES"];

export default function Products3({ parentClass = "flat-spacing-3" }) {
  const { products, loading } = useProducts();
  const [activeItem, setActiveItem] = useState(tabItems[0]); // Default the first item as active
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    if (!loading) {
      document.getElementById("newArrivals")?.classList.remove("filtered");
      setTimeout(() => {
        setSelectedItems(
          products.filter((elm) => elm.tabFilterOptions2?.includes(activeItem))
        );
        document.getElementById("newArrivals")?.classList.add("filtered");
      }, 300);
    }
  }, [activeItem, products, loading]);

  return (
    <section className={parentClass}>
      <div className="container">
        <div className="heading-section wow fadeInUp text-center">
          <h3 className="heading text-primary">
            Skincare & Haircare Essentials
          </h3>
          <p className="subheading ">
            At Beaubless, we blend centuries-old Korean skincare traditions with
            modern science to create gentle, effective, and skin-loving formulas.
            Our products harness the power of rice water, botanical extracts, and
            advanced hydration technology to give you radiant, healthy skin.
          </p>
        </div>

        <div className="flat-animate-tab">
          <ul className="tab-product justify-content-center" role="tablist">
            {tabItems.map((item) => (
              <li
                key={item}
                className={`p-2 rounded ${
                  activeItem === item ? "active-tab" : "inactive-tab"
                }`}
              >
                <a
                  href="#"
                  className={`${activeItem === item ? "active-text" : ""}`}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveItem(item);
                  }}
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>

          <div className="tab-content justify-content-center">
            <div
              className="tab-pane active show tabFilter filtered"
              id="newArrivals"
              role="tabpanel"
            >
              {loading ? (
                 <>
 

                 {/* Skeleton Loader (When loading) */}
                 <div className="skeleton-wrapper pt-5 px-5">
                   <div className="skeleton-item"></div>
                   <div className="skeleton-item"></div>
                   <div className="skeleton-item"></div>
                   <div className="skeleton-item"></div>
                   {/* Add as many skeletons as needed */}
                 </div>
               </>
              ) : (
                <div className="tf-grid-layout tf-col-2 lg-col-3 xl-col-6">
                  {selectedItems.slice(0, 6 ).map((product, i) => (
                    <ProductCard1 key={i} product={product} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
