// src/hooks/useProducts.js
import { useEffect, useState } from "react";
import { getAllProducts } from "@/api/product";

/**
 * Singleton-safe useProducts:
 * - module-level `cache` holds last result
 * - module-level `inFlight` holds promise while a fetch is ongoing
 * - hook returns { products, loading, error, forceRefresh }
 */

let cache = null; // cached mapped products
let inFlight = null; // a Promise while fetch is ongoing

export default function useProducts() {
  const [products, setProducts] = useState(cache || []);
  const [loading, setLoading] = useState(!cache);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    const ensureProducts = async () => {
      if (cache) {
        // already have cache — set and return
        setProducts(cache);
        setLoading(false);
        return;
      }

      if (inFlight) {
        // a fetch is already in progress — reuse it
        try {
          const mapped = await inFlight;
          if (!cancelled) {
            setProducts(mapped);
            setLoading(false);
          }
        } catch (err) {
          if (!cancelled) {
            setError(err);
            setLoading(false);
          }
        }
        return;
      }

      // Start fetch and store the promise in inFlight
      setLoading(true);
      inFlight = (async () => {
        try {
          const myproducts = await getAllProducts();
          const prodArray = myproducts?.products || [];

          // mapping logic (adapted from your previous mapper)
          const mapped = prodArray.map((prod) => {
            const isVariantProduct = prod.productType === "variant";
            const variants = isVariantProduct
              ? prod.variants?.map((variant) => ({
                  variantId: variant._id,
                  size: variant.size || "Default Size",
                  inventory: variant.inventory || 0,
                  category: prod.category,
                  offerPrice:
                    variant.offerprice ||
                    prod.offerPrice ||
                    prod.finalPrice ||
                    prod.price ||
                    0,
                  finalPrice:
                    variant.finalprice || prod.finalPrice || prod.price || 0,
                })) || []
              : [];

            const primaryVariant = variants[0] || {};
            const totalReviews = prod.reviews?.length || 0;
            const averageRating = totalReviews
              ? (
                  prod.reviews.reduce((acc, review) => acc + (review.rating || 0), 0) /
                  totalReviews
                ).toFixed(1)
              : 0;

            return {
              _id: prod._id,
              id: prod._id,
              variants,
              productType: prod.productType ?? "single",
              productId: prod._id,
              title: prod.title,
              name: prod.title,
              slug: prod.slug || "unknown-product",
              price: prod.price ?? 0,
              finalPrice: prod.price ?? 0,
              offerPrice: prod.salePrice ?? prod.salePrice ?? 0,
              images: prod.images || [],
              imgSrc: prod.images?.[0] || "default-image.jpg",
              imgHover: prod.images?.[1] || prod.images?.[0] || "default-image-hover.jpg",
              isOnSale: prod.isOnSale || false,
              is_exclusiveedition: prod.is_exclusiveedition === 1 ? true : false,
              is_trending: prod.is_trending === 1 ? true : false,
              isNewArrival: prod.isNewArrival || false,
              is_bestseller: prod.is_bestseller === 1 || prod.is_bestseller === true,
              is_newlaunched: prod.is_newlaunched === 1 || prod.is_newlaunched === true,
              isFeatured: prod.isFeatured || false,
              stock: isVariantProduct
                ? variants.reduce((total, v) => total + (v.inventory || 0), 0)
                : prod.stock || 0,
              inStock: isVariantProduct
                ? primaryVariant.inventory
                : typeof prod.stock === "number"
                ? prod.stock
                : Number(prod.stock) || 0,
              brand: prod.brand || "Shreeva Jewels",
              shortDescription: prod.shortDescription || "",
              description: prod.description || "",
              shades: prod.shades || [],
              category: prod.category,
              createdAt: prod.createdAt || "",
              updatedAt: prod.updatedAt || "",
              discount: (prod.Price - prod.salePrice),
              ratings: {
                average: Number(averageRating),
                totalReviews,
                reviews: prod.reviews || [],
              },
              sizes: isVariantProduct ? variants.map((v) => v.size) : [],
              filterBrands: prod.brand ? [prod.brand] : ["Generic"],
              filterColor: prod.shades?.length ? prod.shades : ["Default Color"],
              filterSizes: isVariantProduct ? variants.map((v) => v.size) : [],
              filterAvailability: [
                isVariantProduct
                  ? primaryVariant.inventory > 0
                    ? "In Stock"
                    : "Out of Stock"
                  : typeof prod.stock === "number"
                  ? prod.stock > 0
                    ? "In Stock"
                    : "Out of Stock"
                  : Number(prod.stock) > 0
                  ? "In Stock"
                  : "Out of Stock",
              ].filter(Boolean),
              tabFilterOptions2: [
                prod.isNewArrival ? "NEW LAUNCHES" : null,
                prod.isOnSale ? "On Sale" : null,
                prod.isFeatured ? "BESTSELLERS" : null,
              ].filter(Boolean),
              tabFilterOptions: [prod.category?.name || "All"],
            };
          });

          // Save to cache and return mapped
          cache = mapped;
          return mapped;
        } catch (err) {
          // clear cache on error and rethrow
          cache = null;
          throw err;
        } finally {
          // clear inFlight so next call can retry if needed
          inFlight = null;
        }
      })();

      try {
        const mapped = await inFlight;
        if (!cancelled) {
          setProducts(mapped);
          setLoading(false);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err);
          setLoading(false);
        }
      }
    };

    ensureProducts();

    return () => {
      cancelled = true;
    };
  }, []);

  // manual refresh helper (clears cache and re-fetches)
  const forceRefresh = async () => {
    cache = null;
    try {
      setLoading(true);
      const myproducts = await getAllProducts();
      const mapped = (myproducts?.products || []).map((p) => ({ /* ...same mapping...*/ }));
      cache = mapped;
      setProducts(mapped);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { products, loading, error, forceRefresh };
}
export async function getProductsOnce() { const data = await getAllProducts(); return data.products || []; }