import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import { Link, Navigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import MetaComponent from "@/components/common/MetaComponent";
import Topbar from "@/components/headers/Topbar";
import Products16 from "@/components/products/Products16";
import { getCategoryBySlug } from "@/api/category"; // ✅ correct API

const metadata = {
  title: "Shop Collections || Shreeva Jewels - Your Jewelry Choice",
  description: "Shop Collections",
};

export default function ShopCategoriesTopPage1() {
  const { slug } = useParams();

  const [loading, setLoading] = useState(true);
  const [currentCollection, setCurrentCollection] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await getCategoryBySlug(slug); // { category, products }
        
        if (res?.category) {
          const c = res.category;
          
          
          const formatted = {
            id: c._id,
            imgSrc: c.thumbnail || c.images?.[0] || "https://dummy.genexedge.in/?size=600x400&bg=000&fg=fff&format=png&text=Hello+World",
            alt: c.name,
            title: c.name,
            slug: c.slug,
          };
          // console.log(formatted);

          setCurrentCollection(formatted);
          setProducts(res.products || []);
        } else {
          setCurrentCollection(null);
        }
      } catch (err) {
        console.error("❌ Failed to fetch category by slug:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategory();
  }, [slug]);

  if (loading) return null; // TODO: replace with loader/spinner

  if (!currentCollection) {
    return <Navigate to="/collections" replace />;
  }

  return (
    <>
      <MetaComponent meta={metadata} />
      <Topbar />
      <Header1 />

      {/* Banner */}
      <div className="page-title bg-gradient text-white h-10">
        <div className="container-full">
          <div className="row">
            <div className="col-12 text-center text-white py-5">
              <h3 className="heading text-white">{currentCollection.title}</h3>
              <ul className="breadcrumbs d-flex align-items-center justify-content-center">
                <li>
                  <Link className="link text-white" to={`/`}>
                    Homepage
                  </Link>
                </li>
                <li >
                  <i className="icon-arrRight text-white" />
                </li>
                <li className="text-white">{currentCollection.title}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Products under this collection */}
      <Products16
        parentClass="flat-spacing"
        collectionId={currentCollection.id}
        products={products} // ✅ pass products if Products16 supports it
      />

      <Footer1 />
    </>
  );
}
