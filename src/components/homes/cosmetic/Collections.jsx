import { useEffect, useState } from "react";
import { getAllCategories } from "@/api/category";
import slugify from "slugify";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
import { collectionItems4, collections4 } from "@/data/collections";

export default function Collections() {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await getAllCategories();
        const collectionArray = response.categories || [];

        setCollections(
          collectionItems4.map((item, index) => ({
            id: item._id,
            imgSrc: item.imgSrc[0],
            alt: item.title,
            title: item.title,
            slug: slugify(item.slug, { lower: true }),
            subtitle: item.subtitle,
            delay: `${index * 0.1}s`,
          }))
        );
      } catch (error) {
        console.error("Error fetching collections:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCollections();
  }, []);
    if (collectionItems4 && collectionItems4.length !== 0) {
      return (
    <section id="downSection" className="pt-5">
      <div className="container">
        {loading ? (
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
          <Swiper
            dir="ltr"
            slidesPerView={3}
            breakpoints={{
              1300: { slidesPerView: 3 },
              924: { slidesPerView: 2 },
              0: { slidesPerView: 1.7 },
            }}
            spaceBetween={30}
          >
            {collections.map((item, index) => (
              <SwiperSlide key={item.id || index}>
                <div
                  className="collection-position-2 style-5 hover-img wow fadeInUp"
                  data-wow-delay={item.delay}
                >
                  <Link className="img-style" to={`/collections/${item.slug}`}>
                    <img
                      className="lazyload"
                      data-src={item.imgSrc}
                      alt={item.alt}
                      src={item.imgSrc}
                      width={615}
                      height={819}
                    />
                  </Link>
                  <div className="content">
                    <div>
                      <Link
                        to={`/collections/${item.slug}`}
                        className="btn-line style-white text-white"
                      >
                        {item.title}
                      </Link>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
        <div
          className="sec-btn text-center pt-2 pb-2 rounded mt-5"
          style={{
            background: "#5e0d8b",
          }}
        >
          <Link to="/products" className="text-white">
            View All Products &gt;
          </Link>
        </div>
      </div>
    </section>
  );
    }
  
}
