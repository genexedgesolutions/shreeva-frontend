// import LayoutHandler from "./LayoutHandler";
// import Sorting from "./Sorting";
// import Listview from "./Listview";
// import GridView from "./GridView";
// import { useEffect, useReducer, useState } from "react";
// import FilterModal from "./FilterModal";
// import { initialState, reducer } from "@/reducer/filterReducer";
// import { productMain } from "@/data/products";
// import FilterMeta from "./FilterMeta";

// export default function Products1({ parentClass = "flat-spacing" }) {
//   const [activeLayout, setActiveLayout] = useState(4);
//   const [state, dispatch] = useReducer(reducer, initialState);
//   const {
//     price,
//     availability,
//     color,
//     size,
//     brands,

//     filtered,
//     sortingOption,
//     sorted,

//     activeFilterOnSale,
//     currentPage,
//     itemPerPage,
//   } = state;

//   const allProps = {
//     ...state,
//     setPrice: (value) => dispatch({ type: "SET_PRICE", payload: value }),

//     setColor: (value) => {
//       value == color
//         ? dispatch({ type: "SET_COLOR", payload: "All" })
//         : dispatch({ type: "SET_COLOR", payload: value });
//     },
//     setSize: (value) => {
//       value == size
//         ? dispatch({ type: "SET_SIZE", payload: "All" })
//         : dispatch({ type: "SET_SIZE", payload: value });
//     },
//     setAvailability: (value) => {
//       value == availability
//         ? dispatch({ type: "SET_AVAILABILITY", payload: "All" })
//         : dispatch({ type: "SET_AVAILABILITY", payload: value });
//     },

//     setBrands: (newBrand) => {
//       const updated = [...brands].includes(newBrand)
//         ? [...brands].filter((elm) => elm != newBrand)
//         : [...brands, newBrand];
//       dispatch({ type: "SET_BRANDS", payload: updated });
//     },
//     removeBrand: (newBrand) => {
//       const updated = [...brands].filter((brand) => brand != newBrand);

//       dispatch({ type: "SET_BRANDS", payload: updated });
//     },
//     setSortingOption: (value) =>
//       dispatch({ type: "SET_SORTING_OPTION", payload: value }),
//     toggleFilterWithOnSale: () => dispatch({ type: "TOGGLE_FILTER_ON_SALE" }),
//     setCurrentPage: (value) =>
//       dispatch({ type: "SET_CURRENT_PAGE", payload: value }),
//     setItemPerPage: (value) => {
//       dispatch({ type: "SET_CURRENT_PAGE", payload: 1 }),
//         dispatch({ type: "SET_ITEM_PER_PAGE", payload: value });
//     },
//     clearFilter: () => {
//       dispatch({ type: "CLEAR_FILTER" });
//     },
//   };

//   useEffect(() => {
//     let filteredArrays = [];

//     if (brands.length) {
//       const filteredByBrands = [...productMain].filter((elm) =>
//         brands.every((el) => elm.filterBrands.includes(el))
//       );
//       filteredArrays = [...filteredArrays, filteredByBrands];
//     }
//     if (availability !== "All") {
//       const filteredByavailability = [...productMain].filter(
//         (elm) => availability.value === elm.inStock
//       );
//       filteredArrays = [...filteredArrays, filteredByavailability];
//     }
//     if (color !== "All") {
//       const filteredByColor = [...productMain].filter((elm) =>
//         elm.filterColor.includes(color.name)
//       );
//       filteredArrays = [...filteredArrays, filteredByColor];
//     }
//     if (size !== "All" && size !== "Free Size") {
//       const filteredBysize = [...productMain].filter((elm) =>
//         elm.filterSizes.includes(size)
//       );
//       filteredArrays = [...filteredArrays, filteredBysize];
//     }
//     if (activeFilterOnSale) {
//       const filteredByonSale = [...productMain].filter((elm) => elm.oldPrice);
//       filteredArrays = [...filteredArrays, filteredByonSale];
//     }

//     const filteredByPrice = [...productMain].filter(
//       (elm) => elm.price >= price[0] && elm.price <= price[1]
//     );
//     filteredArrays = [...filteredArrays, filteredByPrice];

//     const commonItems = [...productMain].filter((item) =>
//       filteredArrays.every((array) => array.includes(item))
//     );
//     dispatch({ type: "SET_FILTERED", payload: commonItems });
//   }, [price, availability, color, size, brands, activeFilterOnSale]);

//   useEffect(() => {
//     if (sortingOption === "Price Ascending") {
//       dispatch({
//         type: "SET_SORTED",
//         payload: [...filtered].sort((a, b) => a.price - b.price),
//       });
//     } else if (sortingOption === "Price Descending") {
//       dispatch({
//         type: "SET_SORTED",
//         payload: [...filtered].sort((a, b) => b.price - a.price),
//       });
//     } else if (sortingOption === "Title Ascending") {
//       dispatch({
//         type: "SET_SORTED",
//         payload: [...filtered].sort((a, b) => a.title.localeCompare(b.title)),
//       });
//     } else if (sortingOption === "Title Descending") {
//       dispatch({
//         type: "SET_SORTED",
//         payload: [...filtered].sort((a, b) => b.title.localeCompare(a.title)),
//       });
//     } else {
//       dispatch({ type: "SET_SORTED", payload: filtered });
//     }
//     dispatch({ type: "SET_CURRENT_PAGE", payload: 1 });
//   }, [filtered, sortingOption]);
//   return (
//     <>
//       <section className={parentClass}>
//         <div className="container">
//           <div className="tf-shop-control">
//             <div className="tf-control-filter">
//               <a
//                 href="#filterShop"
//                 data-bs-toggle="offcanvas"
//                 aria-controls="filterShop"
//                 className="tf-btn-filter"
//               >
//                 <span className="icon icon-filter" />
//                 <span className="text">Filters</span>
//               </a>
//               <div
//                 onClick={allProps.toggleFilterWithOnSale}
//                 className={`d-none d-lg-flex shop-sale-text ${
//                   activeFilterOnSale ? "active" : ""
//                 }`}
//               >
//                 <i className="icon icon-checkCircle" />
//                 <p className="text-caption-1">Shop sale items only</p>
//               </div>
//             </div>
//             <ul className="tf-control-layout">
//               <LayoutHandler
//                 setActiveLayout={setActiveLayout}
//                 activeLayout={activeLayout}
//               />
//             </ul>
//             <div className="tf-control-sorting">
//               <p className="d-none d-lg-block text-caption-1">Sort by:</p>
//               <Sorting allProps={allProps} />
//             </div>
//           </div>
//           <div className="wrapper-control-shop">
//             <FilterMeta productLength={sorted.length} allProps={allProps} />

//             {activeLayout == 1 ? (
//               <div className="tf-list-layout wrapper-shop" id="listLayout">
//                 <Listview products={sorted} />
//               </div>
//             ) : (
//               <div
//                 className={`tf-grid-layout wrapper-shop tf-col-${activeLayout}`}
//                 id="gridLayout"
//               >
//                 <GridView products={sorted} />
//               </div>
//             )}
//           </div>
//         </div>
//       </section>

//       <FilterModal allProps={allProps} />
//     </>
//   );
// }

//second method

// import LayoutHandler from "./LayoutHandler";
// import Sorting from "./Sorting";
// import Listview from "./Listview";
// import GridView from "./GridView";
// import { useEffect, useReducer, useState } from "react";
// import FilterModal from "./FilterModal";
// import { initialState, reducer } from "@/reducer/filterReducer";
// import FilterMeta from "./FilterMeta";
// import axios from "axios";

// export default function Products1({ parentClass = "flat-spacing" }) {
//   const [activeLayout, setActiveLayout] = useState(4);
//   const [state, dispatch] = useReducer(reducer, initialState);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const {
//     price,
//     availability,
//     color,
//     size,
//     brands,
//     filtered,
//     sortingOption,
//     sorted,
//     activeFilterOnSale,
//     currentPage,
//     itemPerPage,
//   } = state;

//   // Fetch product data from API
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         setLoading(true);
//         setError(null);

//         const response = await axios.get(
//           "http://localhost:5000/api/v1/products/get-all-product"
//         );

//         // const data = await response.json();
//         const data = response.data.products;

//         dispatch({ type: "SET_PRODUCTS", payload: data });
//       } catch (err) {
//         setError("Failed to fetch products");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, []);

//   const allProps = {
//     ...state,
//     setPrice: (value) => dispatch({ type: "SET_PRICE", payload: value }),

//     setColor: (value) => {
//       value === color
//         ? dispatch({ type: "SET_COLOR", payload: "All" })
//         : dispatch({ type: "SET_COLOR", payload: value });
//     },
//     setSize: (value) => {
//       value === size
//         ? dispatch({ type: "SET_SIZE", payload: "All" })
//         : dispatch({ type: "SET_SIZE", payload: value });
//     },
//     setAvailability: (value) => {
//       value === availability
//         ? dispatch({ type: "SET_AVAILABILITY", payload: "All" })
//         : dispatch({ type: "SET_AVAILABILITY", payload: value });
//     },

//     setBrands: (newBrand) => {
//       const updated = [...brands].includes(newBrand)
//         ? [...brands].filter((elm) => elm !== newBrand)
//         : [...brands, newBrand];
//       dispatch({ type: "SET_BRANDS", payload: updated });
//     },
//     removeBrand: (newBrand) => {
//       const updated = [...brands].filter((brand) => brand !== newBrand);
//       dispatch({ type: "SET_BRANDS", payload: updated });
//     },
//     setSortingOption: (value) =>
//       dispatch({ type: "SET_SORTING_OPTION", payload: value }),
//     toggleFilterWithOnSale: () => dispatch({ type: "TOGGLE_FILTER_ON_SALE" }),
//     setCurrentPage: (value) =>
//       dispatch({ type: "SET_CURRENT_PAGE", payload: value }),
//     setItemPerPage: (value) => {
//       dispatch({ type: "SET_CURRENT_PAGE", payload: 1 }),
//         dispatch({ type: "SET_ITEM_PER_PAGE", payload: value });
//     },
//     clearFilter: () => {
//       dispatch({ type: "CLEAR_FILTER" });
//     },
//   };

//   // Filtering Logic
//   useEffect(() => {
//     if (state?.products?.length === 0) return;

//     let filteredArrays = [];
//     const productMain = state.products; // Use fetched products instead of static data

//     if (brands.length) {
//       const filteredByBrands = productMain.filter((elm) =>
//         brands.every((el) => elm.filterBrands.includes(el))
//       );
//       filteredArrays.push(filteredByBrands);
//     }
//     if (availability !== "All") {
//       const filteredByavailability = productMain.filter(
//         (elm) => availability.value === elm.inStock
//       );
//       filteredArrays.push(filteredByavailability);
//     }
//     if (color !== "All") {
//       const filteredByColor = productMain.filter((elm) =>
//         elm.filterColor.includes(color.name)
//       );
//       filteredArrays.push(filteredByColor);
//     }
//     if (size !== "All" && size !== "Free Size") {
//       const filteredBysize = productMain.filter((elm) =>
//         elm.filterSizes.includes(size)
//       );
//       filteredArrays.push(filteredBysize);
//     }
//     if (activeFilterOnSale) {
//       const filteredByonSale = productMain.filter((elm) => elm.oldPrice);
//       filteredArrays.push(filteredByonSale);
//     }

//     const filteredByPrice = productMain?.filter(
//       (elm) => elm.price >= price[0] && elm.price <= price[1]
//     );
//     filteredArrays.push(filteredByPrice);

//     const commonItems = productMain?.filter((item) =>
//       filteredArrays.every((array) => array.includes(item))
//     );
//     dispatch({ type: "SET_FILTERED", payload: commonItems });
//   }, [
//     state.products,
//     price,
//     availability,
//     color,
//     size,
//     brands,
//     activeFilterOnSale,
//   ]);

//   // Sorting Logic
//   useEffect(() => {
//     if (!filtered.length) return;

//     let sortedProducts = [...filtered];

//     switch (sortingOption) {
//       case "Price Ascending":
//         sortedProducts.sort((a, b) => a.price - b.price);
//         break;
//       case "Price Descending":
//         sortedProducts.sort((a, b) => b.price - a.price);
//         break;
//       case "Title Ascending":
//         sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
//         break;
//       case "Title Descending":
//         sortedProducts.sort((a, b) => b.title.localeCompare(a.title));
//         break;
//       default:
//         break;
//     }

//     dispatch({ type: "SET_SORTED", payload: sortedProducts });
//     dispatch({ type: "SET_CURRENT_PAGE", payload: 1 });
//   }, [filtered, sortingOption]);

//   return (
//     <>
//       <section className={parentClass}>
//         <div className="container">
//           {loading ? (
//             <p>Loading products...</p>
//           ) : error ? (
//             <p className="error">{error}</p>
//           ) : (
//             <>
//               <div className="tf-shop-control">
//                 <div className="tf-control-filter">
//                   <a
//                     href="#filterShop"
//                     data-bs-toggle="offcanvas"
//                     aria-controls="filterShop"
//                     className="tf-btn-filter"
//                   >
//                     <span className="icon icon-filter" />
//                     <span className="text">Filters</span>
//                   </a>
//                   <div
//                     onClick={allProps.toggleFilterWithOnSale}
//                     className={`d-none d-lg-flex shop-sale-text ${
//                       activeFilterOnSale ? "active" : ""
//                     }`}
//                   >
//                     <i className="icon icon-checkCircle" />
//                     <p className="text-caption-1">Shop sale items only</p>
//                   </div>
//                 </div>
//                 <ul className="tf-control-layout">
//                   <LayoutHandler
//                     setActiveLayout={setActiveLayout}
//                     activeLayout={activeLayout}
//                   />
//                 </ul>
//                 <div className="tf-control-sorting">
//                   <p className="d-none d-lg-block text-caption-1">Sort by:</p>
//                   <Sorting allProps={allProps} />
//                 </div>
//               </div>
//               <div className="wrapper-control-shop">
//                 <FilterMeta productLength={sorted.length} allProps={allProps} />
//                 {activeLayout === 1 ? (
//                   <div className="tf-list-layout wrapper-shop" id="listLayout">
//                     <Listview products={sorted} />
//                   </div>
//                 ) : (
//                   <div
//                     className={`tf-grid-layout wrapper-shop tf-col-${activeLayout}`}
//                     id="gridLayout"
//                   >
//                     <GridView products={sorted} />
//                   </div>
//                 )}
//               </div>
//             </>
//           )}
//         </div>
//       </section>
//       <FilterModal allProps={allProps} />
//     </>
//   );
// }

//third method

import LayoutHandler from "./LayoutHandler";
import Sorting from "./Sorting";
import Listview from "./Listview";
import GridView from "./GridView";
import { useEffect, useReducer, useState } from "react";
import FilterModal from "./FilterModal";
import { initialState, reducer } from "@/reducer/filterReducer";
import FilterMeta from "./FilterMeta";
import axios from "axios"; // import axios to make API requests
import { getAllProducts } from "@/api/product";

export default function Products1({ parentClass = "flat-spacing" }) {
  const [activeLayout, setActiveLayout] = useState(4);
  const [state, dispatch] = useReducer(reducer, initialState);
  const [products, setProducts] = useState([]); // Added state for products data
  const [loading, setLoading] = useState(true); // Loading state for API request

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
    currentPage,
    itemPerPage,
  } = state;

  const allProps = {
    ...state,
    setPrice: (value) => dispatch({ type: "SET_PRICE", payload: value }),
    setColor: (value) => {
      value == color
        ? dispatch({ type: "SET_COLOR", payload: "All" })
        : dispatch({ type: "SET_COLOR", payload: value });
    },
    setSize: (value) => {
      value == size
        ? dispatch({ type: "SET_SIZE", payload: "All" })
        : dispatch({ type: "SET_SIZE", payload: value });
    },
    setAvailability: (value) => {
      value == availability
        ? dispatch({ type: "SET_AVAILABILITY", payload: "All" })
        : dispatch({ type: "SET_AVAILABILITY", payload: value });
    },
    setBrands: (newBrand) => {
      const updated = brands.includes(newBrand)
        ? brands.filter((elm) => elm !== newBrand)
        : [...brands, newBrand];
      dispatch({ type: "SET_BRANDS", payload: updated });
    },
    removeBrand: (newBrand) => {
      const updated = brands.filter((brand) => brand !== newBrand);
      dispatch({ type: "SET_BRANDS", payload: updated });
    },
    setSortingOption: (value) =>
      dispatch({ type: "SET_SORTING_OPTION", payload: value }),
    toggleFilterWithOnSale: () => dispatch({ type: "TOGGLE_FILTER_ON_SALE" }),
    setCurrentPage: (value) =>
      dispatch({ type: "SET_CURRENT_PAGE", payload: value }),
    setItemPerPage: (value) => {
      dispatch({ type: "SET_CURRENT_PAGE", payload: 1 });
      dispatch({ type: "SET_ITEM_PER_PAGE", payload: value });
    },
    clearFilter: () => dispatch({ type: "CLEAR_FILTER" }),
  };

  // Fetch products from the API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getAllProducts();
        setProducts(response?.data); // Save fetched products to state
        console.log(response?.data);
        dispatch({ type: "SET_FILTERED", payload: response?.data });

        setLoading(false); // Stop loading once data is fetched
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false); // Stop loading even if there is an error
      }
    };

    fetchProducts();
  }, []); // Empty dependency array, so it only runs on mount

  // Apply filters on products
  useEffect(() => {
    if (products?.length > 0) {
      let filteredArrays = [];

      if (brands.length) {
        const filteredByBrands = products.filter((elm) =>
          brands.every((el) => elm.filterBrands.includes(el))
        );
        filteredArrays.push(filteredByBrands);
      }
      if (availability !== "All") {
        const filteredByAvailability = products.filter(
          (elm) => availability.value === elm.inStock
        );
        filteredArrays.push(filteredByAvailability);
      }
      if (color !== "All") {
        const filteredByColor = products.filter((elm) =>
          elm.filterColor.includes(color.name)
        );
        filteredArrays.push(filteredByColor);
      }
      if (size !== "All" && size !== "Free Size") {
        const filteredBySize = products.filter((elm) =>
          elm.filterSizes.includes(size)
        );
        filteredArrays.push(filteredBySize);
      }
      if (activeFilterOnSale) {
        const filteredByOnSale = products.filter((elm) => elm.oldPrice);
        filteredArrays.push(filteredByOnSale);
      }

      const filteredByPrice = products.filter(
        (elm) => elm.price >= price[0] && elm.price <= price[1]
      );
      filteredArrays.push(filteredByPrice);

      const commonItems = products.filter((item) =>
        filteredArrays.every((array) => array.includes(item))
      );

      dispatch({ type: "SET_FILTERED", payload: commonItems });
    }
  }, [price, availability, color, size, brands, activeFilterOnSale, products]);

  // Apply sorting on filtered products
  useEffect(() => {
    if (sortingOption === "Price Ascending") {
      dispatch({
        type: "SET_SORTED",
        payload: [...filtered].sort((a, b) => a.price - b.price),
      });
    } else if (sortingOption === "Price Descending") {
      dispatch({
        type: "SET_SORTED",
        payload: [...filtered].sort((a, b) => b.price - a.price),
      });
    } else if (sortingOption === "Title Ascending") {
      dispatch({
        type: "SET_SORTED",
        payload: [...filtered].sort((a, b) => a.title.localeCompare(b.title)),
      });
    } else if (sortingOption === "Title Descending") {
      dispatch({
        type: "SET_SORTED",
        payload: [...filtered].sort((a, b) => b.title.localeCompare(a.title)),
      });
    } else {
      dispatch({ type: "SET_SORTED", payload: filtered });
    }
    dispatch({ type: "SET_CURRENT_PAGE", payload: 1 });
  }, [filtered, sortingOption]);

  // Loading state
  if (loading) {
    return (
      <div id="preloader" className="preload-container">
        <div className="loader-wrapper">
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  return (
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
                className={`d-none d-lg-flex shop-sale-text ${
                  activeFilterOnSale ? "active" : ""
                }`}
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
            <FilterMeta productLength={sorted.length} allProps={allProps} />
            {activeLayout === 1 ? (
              <div className="tf-list-layout wrapper-shop" id="listLayout">
                <Listview products={sorted} />
              </div>
            ) : (
              <div
                className={`tf-grid-layout wrapper-shop tf-col-${activeLayout}`}
                id="gridLayout"
              >
                {products && <GridView products={sorted} />}
              </div>
            )}
          </div>
        </div>
      </section>
      <FilterModal allProps={allProps} />
    </>
  );
}
