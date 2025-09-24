// products.js
export function formatProducts(prodArray = []) {
    return prodArray.map((prod) => {
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
        productType: prod.productType,
        productId: prod._id,
        title: prod.name,
        name: prod.name,
        slug: prod.slug || "unknown-product",
        price: isVariantProduct
          ? primaryVariant.finalPrice
          : prod.finalPrice ?? prod.price ?? 0,
        finalPrice: isVariantProduct
          ? primaryVariant.finalPrice
          : prod.finalPrice ?? prod.price ?? 0,
        offerPrice: isVariantProduct
          ? primaryVariant.offerPrice
          : prod.offerPrice ?? prod.finalPrice ?? prod.price ?? 0,
        images: prod.images || [],
        imgSrc: prod.images?.[0] || "default-image.jpg",
        imgHover:
          prod.images?.[1] || prod.images?.[0] || "default-image-hover.jpg",
        isOnSale: prod.isOnSale || false,
        isNewArrival: prod.isNewArrival || false,
        isFeatured: prod.isFeatured || false,
        stock: isVariantProduct
          ? variants.reduce((total, v) => total + (v.inventory || 0), 0)
          : prod.stock || 0,
        inStock: isVariantProduct
          ? primaryVariant.inventory
          : typeof prod.stock === "number"
          ? prod.stock
          : Number(prod.stock) || 0,
        brand: prod.brand || "Unknown Brand",
        shortDescription: prod.shortDescription || "",
        description: prod.description || "",
        shades: prod.shades || [],
        category: prod.category,
        ingredients: prod.ingredients || [],
        createdAt: prod.createdAt || "",
        updatedAt: prod.updatedAt || "",
        discount: prod.discount || { percentage: 0, validUntil: null },
        ratings: {
          average: Number(averageRating),
          totalReviews: totalReviews,
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
  }
  