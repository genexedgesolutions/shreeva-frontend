import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import Topbar6 from "@/components/headers/Topbar6";
import Breadcumb from "@/components/productDetails/Breadcumb";
import DescriptionList from "@/components/productDetails/descriptions/DescriptionList";
import Details1 from "@/components/productDetails/details/Details1";
import RelatedProducts from "@/components/productDetails/RelatedProducts";
import MetaComponent from "@/components/common/MetaComponent";
import Topbar from "@/components/headers/Topbar";
import { getSingleProduct } from "@/api/product";

export default function ProductDescriptionListPage() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);

  const formatProductData = (prod) => {
    const variants =
      prod.productType === "variant" && prod.variants
        ? prod.variants.map((variant) => ({
            variantId: variant._id,
            size: variant.size || "Default Size",
            inventory: variant.inventory || 0,
            offerPrice:
              variant.offerprice ||
              prod.offerPrice ||
              prod.finalPrice ||
              prod.price ||
              0,
            finalPrice:
              variant.finalprice || prod.finalPrice || prod.price || 0,
            category: prod.category || "General",
          }))
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
      productId: prod._id,
      name: prod.name,
      productType: prod.productType,
      slug: prod.slug || "unknown-product",
      price:
        prod.productType === "variant"
          ? primaryVariant.finalPrice || prod.finalPrice || prod.price || 0
          : prod.finalPrice || prod.price || 0,
      offerPrice:
        prod.productType === "variant"
          ? primaryVariant.offerPrice ||
            prod.offerPrice ||
            prod.finalPrice ||
            prod.price ||
            0
          : prod.offerPrice || prod.finalPrice || prod.price || 0,
      images: prod.images || [],
      stock:
        prod.productType === "variant"
          ? primaryVariant.inventory || 0
          : prod.stock || 0,
      brand: prod.brand || "Unknown Brand",
      reviews: prod.reviews || [],
      ratings: {
        average: Number(averageRating),
        totalReviews,
      },
      discount: prod.discount || { percentage: 0, validUntil: null },
      description: prod.description || "No description available",
      shortDescription: prod.shortDescription || "",
      createdAt: prod.createdAt || "",
      updatedAt: prod.updatedAt || "",
      category: prod.category || "General",
      variants,
      finalPrice:
        prod.productType === "variant"
          ? primaryVariant.finalPrice || prod.finalPrice || prod.price || 0
          : prod.finalPrice || prod.price || 0,
      sizes: prod.productType === "variant" ? variants.map((v) => v.size) : [],
      filterBrands: prod.brand ? [prod.brand] : ["Generic"],
      filterColor: prod.shades?.length ? prod.shades : ["Default Color"],
      filterAvailability:
        (prod.stock || primaryVariant.inventory) > 0
          ? "In Stock"
          : "Out of Stock",
    };
  };

  const fetchProduct = async () => {
    try {
      const fetchedProduct = await getSingleProduct(slug);
      const formattedProduct = formatProductData(fetchedProduct.product);
      setProduct(formattedProduct);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [slug]);

  if (!product) {
    return <div>Products Loading...</div>; // Loading state
  }

  const metadata = {
    title: product.name || "Product Details",
    description:
      product.description ||
      "Discover the best products with detailed descriptions and amazing offers.",
  };

  return (
    <>
      <MetaComponent meta={metadata} />
      <Topbar />
      <Header1 />
      <Breadcumb product={product} />
      <Details1 product={product} />
      {/* <DescriptionList product={product} /> */}
      <RelatedProducts product={product} />
      <Footer1 hasPaddingBottom />
    </>
  );
}
