import LayoutHandler from "./LayoutHandler";
import Sorting from "./Sorting";
import Listview from "./Listview";
import GridView from "./GridView";
import { useEffect, useReducer, useState } from "react";
import FilterModal from "./FilterModal";
import { initialState, reducer } from "@/reducer/filterReducer";
import FilterMeta from "./FilterMeta";
import useProducts from "@/hooks/useProducts";

export default function Products14({ parentClass = "flat-spacing", collectionId }) {
  const { products, loading: isProductLoading } = useProducts();
  const [activeLayout, setActiveLayout] = useState(4);
  const [state, dispatch] = useReducer(reducer, initialState);
  const [loading, setLoading] = useState(false);
  const [loadedItems, setLoadedItems] = useState([]);
  const [allLoaded, setAllLoaded] = useState(false);

  const {
    price,
    availability,
    color,
    size,
    brands,
    filtered,
    sortingOption,
    sorted,
    activeFilterOnSale,
  } = state;

  const allProps = {
    ...state,
    setPrice: (value) => dispatch({ type: "SET_PRICE", payload: value }),
    setColor: (value) =>
      dispatch({
        type: "SET_COLOR",
        payload: value === color ? "All" : value,
      }),
    setSize: (value) =>
      dispatch({
        type: "SET_SIZE",
        payload: value === size ? "All" : value,
      }),
    setAvailability: (value) =>
      dispatch({
        type: "SET_AVAILABILITY",
        payload: value === availability ? "All" : value,
      }),
    setBrands: (newBrand) => {
      const updated = brands.includes(newBrand)
        ? brands.filter((b) => b !== newBrand)
        : [...brands, newBrand];
      dispatch({ type: "SET_BRANDS", payload: updated });
    },
    removeBrand: (brandToRemove) =>
      dispatch({
        type: "SET_BRANDS",
        payload: brands.filter((b) => b !== brandToRemove),
      }),
    setSortingOption: (value) =>
      dispatch({ type: "SET_SORTING_OPTION", payload: value }),
    toggleFilterWithOnSale: () =>
      dispatch({ type: "TOGGLE_FILTER_ON_SALE" }),
    setCurrentPage: (value) =>
      dispatch({ type: "SET_CURRENT_PAGE", payload: value }),
    setItemPerPage: (value) => {
      dispatch({ type: "SET_CURRENT_PAGE", payload: 1 });
      dispatch({ type: "SET_ITEM_PER_PAGE", payload: value });
    },
    clearFilter: () => dispatch({ type: "CLEAR_FILTER" }),
  };

  useEffect(() => {
    let filteredArrays = [];

    if (brands.length) {
      const byBrands = products.filter((p) =>
        brands.every((b) => p.filterBrands.includes(b))
      );
      filteredArrays.push(byBrands);
    }

    if (availability !== "All") {
      const byAvailability = products.filter((p) =>
        availability.value
          ? p.filterAvailability.includes("In Stock")
          : p.filterAvailability.includes("Out of Stock")
      );
      filteredArrays.push(byAvailability);
    }

    if (color !== "All") {
      const byColor = products.filter((p) =>
        p.filterColor.includes(color.name)
      );
      filteredArrays.push(byColor);
    }

    if (size !== "All" && size !== "") {
      const bySize = products.filter((p) =>
        p.filterSizes.includes(size)
      );
      filteredArrays.push(bySize);
    }

    if (activeFilterOnSale) {
      const onSale = products.filter((p) => p.oldPrice);
      filteredArrays.push(onSale);
    }

    // const byPrice = products.filter(
    //   (p) => p.price >= price[0] && p.price <= price[1]
    // );
    // filteredArrays.push(byPrice);

    const finalFiltered = products.filter((item) =>
      filteredArrays.every((arr) => arr.includes(item))
    );

    dispatch({ type: "SET_FILTERED", payload: finalFiltered });
  }, [products, price, availability, color, size, brands, activeFilterOnSale]);

  useEffect(() => {
    let sortedItems = [...filtered];
    if (sortingOption === "Price Ascending") {
      sortedItems.sort((a, b) => a.price - b.price);
    } else if (sortingOption === "Price Descending") {
      sortedItems.sort((a, b) => b.price - a.price);
    } else if (sortingOption === "Title Ascending") {
      sortedItems.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortingOption === "Title Descending") {
      sortedItems.sort((a, b) => b.title.localeCompare(a.title));
    }
    dispatch({ type: "SET_SORTED", payload: sortedItems });
    dispatch({ type: "SET_CURRENT_PAGE", payload: 1 });
  }, [filtered, sortingOption]);

  useEffect(() => {
    const filteredByCategory = sorted.filter(
      (p) => p.category === collectionId
    );
    const initialItems = filteredByCategory.slice(0, 4);
    setLoadedItems(initialItems);
    setAllLoaded(initialItems.length >= filteredByCategory.length);
  }, [sorted, collectionId]);

  const handleLoad = () => {
    if (loading || allLoaded) return;

    setLoading(true);
    setTimeout(() => {
      const filteredByCategory = products.filter(
        (p) => p.category === collectionId
      );
      const nextItems = filteredByCategory.slice(
        loadedItems.length,
        loadedItems.length + 4
      );
      const updatedItems = [...loadedItems, ...nextItems];
      setLoadedItems(updatedItems);
      setAllLoaded(updatedItems.length >= filteredByCategory.length);
      setLoading(false);
    }, 800);
  };
 

  return (
    <>
        {(loading || !loadedItems.length) ? (
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
          <>
      <section className={parentClass}>
        <div className="container">
          <div className="tf-shop-control">
            <div className="tf-control-filter">
              <a
                href="#filterShop"
                data-bs-toggle="offcanvas"
                aria-controls="filterShop"
                className="tf-btn-filter"
              >
                <span className="icon icon-filter" />
                <span className="text">Filters</span>
              </a>
              <div
                onClick={allProps.toggleFilterWithOnSale}
                className={`d-none d-lg-flex shop-sale-text ${activeFilterOnSale ? "active" : ""}`}
              >
                <i className="icon icon-checkCircle" />
                <p className="text-caption-1">Shop sale items only</p>
              </div>
            </div>
            <ul className="tf-control-layout">
              <LayoutHandler
                setActiveLayout={setActiveLayout}
                activeLayout={activeLayout}
              />
            </ul>
            <div className="tf-control-sorting">
              <p className="d-none d-lg-block text-caption-1">Sort by:</p>
              <Sorting allProps={allProps} />
            </div>
          </div>

          <div className="wrapper-control-shop">
            <FilterMeta productLength={loadedItems.length} allProps={allProps} />

            {activeLayout === 1 ? (
              <div className="tf-list-layout wrapper-shop" id="listLayout">
                <Listview pagination={false} products={loadedItems} />
                {!allLoaded && (
                  <div className="wd-load d-flex justify-content-center">
                    <button
                      onClick={handleLoad}
                      className={`load-more-btn btn-out-line tf-loading ${loading ? "loading" : ""}`}
                    >
                      <span className="text-btn">Load more</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className={`tf-grid-layout wrapper-shop tf-col-${activeLayout}`} id="gridLayout">
                <GridView pagination={false} products={loadedItems} />
                {!allLoaded && (
                  <div className="wd-load d-flex justify-content-center">
                    <button
                      onClick={handleLoad}
                      className={`load-more-btn btn-out-line tf-loading ${loading ? "loading" : ""}`}
                    >
                      <span className="text-btn">Load more</span>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      <FilterModal allProps={allProps} />
    </>
        )}
      </>
  );
}
