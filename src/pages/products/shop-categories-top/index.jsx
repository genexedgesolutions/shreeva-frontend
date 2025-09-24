import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import { Link, Navigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import MetaComponent from "@/components/common/MetaComponent";
import Topbar from "@/components/headers/Topbar";
import Products14 from "@/components/products/Products14";
import { getAllCategories } from "@/api/category";
import slugify from "slugify";

const metadata = {
  title: "Shop Collections || Beaubless",
  description: "Shop Collections",
};

export default function ShopCategoriesTopPage1() {
  const { slug } = useParams();

  const [loading, setLoading] = useState(true);
  const [collection, setCollection] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getAllCategories();
        const collectionArray = res.categories.map((collection, index) => ({
          id: collection._id,
          imgSrc: collection.image?.[0],
          alt: collection.name,
          title: collection.name,
          slug: slugify(collection.name, { lower: true }),
          subtitle: collection.name,
          delay: `${index * 0.1}s`,
        }));

        setCollection(collectionArray);

        const matchedCollection = collectionArray.find(
          (item) => item.slug === slug
        );

        setCollection(matchedCollection || null);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [slug]);

  if (loading) return null; // or a spinner

  if (!collection) {
    return <Navigate to="/products" replace />;
  }

  const collectionId = collection.id;
  return (
    <>
      <MetaComponent meta={metadata} />
      <Topbar />
      <Header1 />
      <div
        className="page-title"
        style={{ backgroundImage: "url(/images/section/bg-2.png )" }}
      >
        <div className="container-full">
          <div className="row">
            <div className="col-12">
              <h3 className="heading text-center">Collections</h3>
              <ul className="breadcrumbs d-flex align-items-center justify-content-center">
                <li>
                  <Link className="link" to={`/`}>
                    Homepage
                  </Link>
                </li>
                <li>
                  <i className="icon-arrRight" />
                </li>
                <li>Collections</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Products14 parentClass="flat-spacing" collectionId={collectionId} />
      <Footer1 />
    </>
  );
}
