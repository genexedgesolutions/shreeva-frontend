import { useEffect, useState } from "react";
import { getAllCategories } from "@/api/category";
import slugify from "slugify";
import { Link } from "react-router-dom";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function ShopCategories() {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const mycollections = await getAllCategories();
        const collectionArray = mycollections.categories || [];
        setCollections(
          collectionArray.map((collection, index) => ({
            id: collection._id,
            imgSrc: collection.image[0],
            alt: collection.name,
            title: collection.name,
            slug: slugify(collection.name, { lower: true }),
            subtitle: collection.name,
            delay: `${index * 0.1}s`,
          }))
        );
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <section className="flat-spacing">
      <div className="container">
        {loading ? (
          <div id="preloader" class="preload-container">
          <div class="loader-wrapper">
            <div class="spinner"></div>
          </div>
        </div>
        ) : (
          <Swiper
            dir="ltr"
            slidesPerView={5}
            spaceBetween={20}
            breakpoints={{
              1200: { slidesPerView: 6, spaceBetween: 20 },
              1000: { slidesPerView: 4, spaceBetween: 20 },
              768: { slidesPerView: 3, spaceBetween: 20 },
              480: { slidesPerView: 2, spaceBetween: 15 },
              0: { slidesPerView: 2, spaceBetween: 15 },
            }}
            modules={[Pagination, Navigation]}
            pagination={{ clickable: true, el: ".spd54" }}
            navigation={{ prevEl: ".snbp12", nextEl: ".snbn12" }}
          >
            {collections.map((collection, index) => (
              <SwiperSlide key={collection.id || index}>
                <div className="collection-circle hover-img">
                  <Link
                    to={`/shop-collection/${collection.slug}`}
                    className="img-style"
                  >
                    <img
                      className="lazyload"
                      data-src={collection.imgSrc}
                      alt={collection.alt}
                      src={collection.imgSrc}
                      width={363}
                      height={363}
                    />
                  </Link>
                  <div className="collection-content text-center">
                    <div>
                      <Link
                        to={`/shop-collection/${collection.slug}`}
                        className="cls-title"
                      >
                        <h6 className="text">{collection.title}</h6>
                        <i className="icon icon-arrowUpRight" />
                      </Link>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
        <div className="d-flex d-lg-none sw-pagination-collection sw-dots type-circle justify-content-center spd54" />
      </div>
    </section>
  );
}
