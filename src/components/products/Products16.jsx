import { useEffect, useState } from "react";
import Listview from "./Listview";
import GridView from "./GridView";

export default function Products16({ parentClass = "flat-spacing", products = [] }) {
  const [activeLayout, setActiveLayout] = useState(4); // 1 = list, >1 = grid
  const [loadMoreLoading, setLoadMoreLoading] = useState(false);
  const [loadedItems, setLoadedItems] = useState([]);
  const [allLoaded, setAllLoaded] = useState(false);

  // initialize first batch
  useEffect(() => {
    if (!products?.length) {
      setLoadedItems([]);
      return;
    }
    const initial = products.slice(0, 8); // first 8 products
    setLoadedItems(initial);
    setAllLoaded(initial.length >= products.length);
  }, [products]);

  const handleLoad = () => {
    if (loadMoreLoading || allLoaded) return;
    setLoadMoreLoading(true);

    setTimeout(() => {
      const next = products.slice(loadedItems.length, loadedItems.length + 8);
      const updated = [...loadedItems, ...next];
      setLoadedItems(updated);
      setAllLoaded(updated.length >= products.length);
      setLoadMoreLoading(false);
    }, 400);
  };

  if (!products?.length) {
    return (
      <div className="py-5 text-center">
        <p className="text-secondary">No products found. <br />New Collection Will get update soon</p>
      </div>
    );
  }

  return (
    <section className={parentClass}>
      <div className="container">
        <div className="wrapper-control-shop">
          {activeLayout === 1 ? (
            <div className="tf-list-layout wrapper-shop" id="listLayout">
              <Listview pagination={false} products={loadedItems} />
              {!allLoaded && (
                <div className="wd-load d-flex justify-content-center">
                  <button
                    onClick={handleLoad}
                    className={`load-more-btn btn-out-line tf-loading ${loadMoreLoading ? "loading" : ""}`}
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
                    className={`load-more-btn btn-out-line tf-loading ${loadMoreLoading ? "loading" : ""}`}
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
  );
}
