
import { Swiper, SwiperSlide } from "swiper/react";

import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import { useContextElement } from "@/context/Context";
import { Pagination } from "swiper/modules";
import useProducts from "@/hooks/useProducts";
export default function Lookbook() {
    const {products} = useProducts()
  const {
    setQuickAddItem,
    addProductToCart,
    isAddedToCartProducts,
    addToCompareItem,
    addToWishlist,
    isAddedtoWishlist,
    isAddedtoCompareItem,
    cartProducts,
    updateQuantity,
  } = useContextElement();
  const swiperRef = useRef(null);
  useEffect(() => {
    const hoverWrap = document.querySelector(".bundle-hover-wrap");
    const pinItems = document.querySelectorAll(".bundle-pin-item");
    const hoverItems = document.querySelectorAll(".bundle-hover-item");

    if (hoverWrap) {
      const handleMouseOver = (event) => {
        hoverWrap.classList.add("has-hover");

        const targetId = event.target.id;

        // Ensure targetId is valid
        if (targetId) {
          const hoverItem = hoverWrap.querySelector(`.${event.target.id}`); // Matches class with spaces
          if (hoverItem) hoverItem.style.display = "block";

          hoverItems.forEach((item) => {
            if (item !== hoverItem) {
              item.classList.add("no-hover");
            }
          });
        }
      };

      const handleMouseLeave = () => {
        hoverWrap.classList.remove("has-hover");
        hoverItems.forEach((item) => {
          item.classList.remove("no-hover");
          item.style.display = ""; // Reset the display property if modified
        });
      };

      pinItems.forEach((pinItem) => {
        pinItem.addEventListener("mouseover", handleMouseOver);
        pinItem.addEventListener("mouseleave", handleMouseLeave);
      });

      // Cleanup to avoid memory leaks
      return () => {
        pinItems.forEach((pinItem) => {
          pinItem.removeEventListener("mouseover", handleMouseOver);
          pinItem.removeEventListener("mouseleave", handleMouseLeave);
        });
      };
    }
  }, []);
  const goToSecondSlide = (index) => {
    if (swiperRef.current) {
      swiperRef.current.slideTo(index); // Swiper uses 0-based indexing, so 1 refers to the 2nd slide.
    }
  };

  const handleAddSetToCart = () => {
    products
      .filter((product) => product.isFeatured && product.isOnSale) // Filter featured & on-sale products
      .forEach((product) => {
        const quantityToAdd = isAddedToCartProducts(product.id)
          ? cartProducts.find((item) => item.id === product.id)?.quantity + 1
          : 1;

        if (product.productType === "variant" && product.variants?.length > 0) {
          // Automatically select the first variant if product has variants
          addProductToCart(
            product.id,
            quantityToAdd,
            product,
            product.variants[0]
          );
        } else {
          // Directly add to cart for single products or products without variants
          addProductToCart(product.id, quantityToAdd, product);
        }
      });
  };

  return (
    <section className="">
      <div className="flat-with-text-lookbook-v2 wrap-lookbook-hover">
        <div className="container lookbook-content">
          <div className="box-title">
            <h3 className="title wow fadeInUp text-primary">
              Unbeatable Beauty Deals
            </h3>
          </div>
          <Swiper
            spaceBetween={15}
            slidesPerView={1}
            breakpoints={{
              0: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
            }}
            modules={[Pagination]}
            pagination={{
              el: ".spd457",
              clickable: true,
            }}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            className="bundle-hover-wrap"
          >
            {products
              .filter((product) => product.isFeatured && product.isOnSale)
              .map((product, index) => (
                <SwiperSlide key={index}>
                  <div
                    className={`card-product bundle-hover-item wow fadeInUp  pin${
                      index + 1
                    }`}
                    data-wow-delay={product.wowDelay}
                  >
                    <div className="card-product-wrapper">
                      <Link
                        to={`/product-detail/${product.id}`}
                        className="product-img"
                      >
                        <img
                          className="lazyload img-product"
                          data-src={product.imgSrc}
                          alt="image-product"
                          src={product.imgSrc}
                          width={600}
                          height={800}
                        />
                        <img
                          className="lazyload img-hover"
                          data-src={product.imgHover}
                          alt="image-product"
                          src={product.imgHover}
                          width={600}
                          height={800}
                        />
                      </Link>
                      <div className="on-sale-wrap">
                        <span className="on-sale-item">-25%</span>
                      </div>
                      <div className="list-btn-main">
                        <a
                          href="#quickView"
                          onClick={() => setQuickAddItem(product.id)}
                          data-bs-toggle="modal"
                          className="btn-main-product"
                        >
                          Quick View
                        </a>
                      </div>
                    </div>
                    <div className="card-product-info">
                      <Link
                        to={`/product-detail/${product.id}`}
                        className="title link"
                      >
                        {product.title}
                      </Link>
                      <div className="sub d-md-flex">
                        <div className="tf-product-info-rate d-flex">
                          <div className="list-star d-flex">
                            {[...Array(5)].map((_, i) => (
                              <i
                                key={i}
                                className={`icon icon-star ${
                                  i < Math.round(product?.ratings?.average || 0)
                                    ? "filled"
                                    : ""
                                }`}
                              />
                            ))}
                          </div>
                          {product?.ratings?.totalReviews > 0 && (
                            <div className="text text-caption-1 text-primary ms-2">
                              ({product.ratings.totalReviews})
                            </div>
                          )}
                        </div>
                      </div>
                      <span className="price">
                        {product.finalPrice && (
                          <span className="old-price">
                            ₹{product.finalPrice.toFixed(2)}
                          </span>
                        )}{" "}
                        ₹{product.offerPrice?.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </SwiperSlide>
              ))}

            <div className="sw-pagination-lookbook sw-dots type-circle justify-content-center spd457"></div>
          </Swiper>
          <div
            className="total-lb wow fadeInUp text-center bg-primary border rounded"
            style={{
              background:
                "linear-gradient(81deg, #5e0d8b 1% 37.5%, #9268aa 91.5%)",
            }}
          >
            <a
              href="#addSetToCartModal"
              data-bs-toggle="modal"
              className="text-white pt-2 pb-2"
            >
              <span className="text-white">Add set to cart</span>
              <i className="icon icon-arrowUpRight" />
            </a>
            {/* Modal */}
            <div className="modal fade" id="addSetToCartModal">
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Confirm Add to Cart</h5>
                    <button
                      type="button"
                      className="close"
                      data-bs-dismiss="modal"
                    >
                      &times;
                    </button>
                  </div>
                  <div className="modal-body">
                    <p>Are you sure you want to add all items to your cart?</p>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="btn bg-primary text-white"
                      onClick={handleAddSetToCart}
                      data-bs-dismiss="modal"
                    >
                      Yes, Add All
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* Modal */}
          </div>
        </div>
        <div className="banner-img">
          <img
            className="lazyload rounded"
            data-src="/images/banner/Lookbook.png"
            alt="banner"
            src="/images/banner/Lookbook.png"
            width={1080}
            height={600}
          />
          <div
            className="tf-pin-btn style-hover pin-1 bundle-pin-item swiper-button"
            onClick={() => goToSecondSlide(0)}
          >
            <span id="pin1" />
          </div>
          <div
            className="tf-pin-btn style-hover pin-2 bundle-pin-item swiper-button"
            onClick={() => goToSecondSlide(1)}
          >
            <span id="pin2" />
          </div>
          <div
            className="tf-pin-btn style-hover pin-3 bundle-pin-item swiper-button"
            onClick={() => goToSecondSlide(2)}
          >
            <span id="pin3" />
          </div>
        </div>
      </div>
    </section>
  );
}
