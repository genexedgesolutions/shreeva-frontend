import React, { useEffect, useState } from "react";
import Pagination from "../common/Pagination";
import { getAllCategories } from "@/api/category";
import slugify from "slugify";

export default function Collections() {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getAllCategories();

        const collectionArray = res.categories.map((collection, index) => ({
          id: collection._id,
          // ✅ prefer thumbnail, fallback to images[0]
          imgSrc: collection.thumbnail || collection.images?.[0] || "https://dummy.genexedge.in/?size=500x500&bg=333&fg=fff&format=png&text="+collection.name,
          alt: collection.name,
          title: collection.name,
          slug: collection.slug || slugify(collection.name, { lower: true }),
          subtitle: collection.name,
          count: collection.productCount || 0,
          delay: `${index * 0.1}s`,
        }));

        setCollections(collectionArray);
      } catch (error) {
        console.error("Failed to fetch collections", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) return null; // or loader

  return (
    <section className="flat-spacing">
      <div className="container">
        <div className="tf-grid-layout tf-col-2 lg-col-4">
          {collections.map((item) => (
            <div
              key={item.id}
              className="collection-position-2 radius-lg style-3 hover-img"
            >
              <a className="img-style" href={`/collections/${item.slug}`}>
                <img
                  className="lazyload"
                  src={item.imgSrc}
                  alt={item.alt}
                  width={450}
                  height={600}
                />
              </a>
              <div className="content">
                <a href={`/collections/${item.slug}`} className="cls-btn">
                  <h6 className="text">{item.title}</h6>
                  <span className="count-item text-secondary">{item.count}</span>
                  <i className="icon icon-arrowUpRight" />
                </a>
              </div>
            </div>
          ))}

          {/* pagination */}
          <ul className="wg-pagination justify-content-center">
            <Pagination />
          </ul>
        </div>
      </div>
    </section>
  );
}
