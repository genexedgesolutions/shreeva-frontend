import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import Topbar6 from "@/components/headers/Topbar";
import Breadcumb from "@/components/productDetails/Breadcumb";
import Descriptions1 from "@/components/productDetails/descriptions/Descriptions1";
import Details1 from "@/components/productDetails/details/Details1";
import RelatedProducts from "@/components/productDetails/RelatedProducts";
import { allProducts } from "@/data/products";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import MetaComponent from "@/components/common/MetaComponent";
import axios from "axios";
const metadata = {
  title: "Product Detail || Beaubless Cosmetics - Your Skincare Choice",
  description: "Beaubless Cosmetics - Your Skincare Choice",
};

export default function ProductDetailPage() {
  const [product, setProduct] = React.useState({});
  let params = useParams();
  const id = params.id;

  //fetch product details
  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await axios.get(
          `https://www.api.beaubless.com/api/v1/products/get-single-product/${id}`
        );
        setProduct(response?.data?.product);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    }
    fetchProduct();
  }, []);
  // console.log(product);

  // const product = allProducts.filter((p) => p.id == id)[0] || allProducts[0];

  return (
    <>
      <MetaComponent meta={metadata} />
      <Topbar6 bgColor="bg-main" />
      <Header1 />
      {product && <Details1 product={product} />}
      {/* <Breadcumb product={product} /> */}
      <Details1 product={product} />
      {product && <Descriptions1 product={product} />}
      <RelatedProducts />
      <Footer1 hasPaddingBottom />
    </>
  );
}
