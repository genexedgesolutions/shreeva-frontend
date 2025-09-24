import { iconboxItems } from "@/data/features";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Features({ parentClass = "flat-spacing" }) {
  return (
    <section className={parentClass}>
      <div className="container ">
        <div className="heading-section text-center">
          <h3 className="heading wow fadeInUp text-primary">
             Our Features
          </h3>
          <p className="subheading wow fadeInUp">
            Our products are crafted with ethically sourced, cruelty-free
            ingredients, ensuring luxury, effectiveness, and sustainability.
            Experience skincare that truly cares for you! 
          </p>
        </div>
        <Swiper
          dir="ltr"
          className="swiper tf-sw-iconbox p-5 bg-light-purple rounded"
          spaceBetween={15}
          breakpoints={{
            1200: { slidesPerView: 4 },
            768: { slidesPerView: 3 },
            576: { slidesPerView: 1 },
            0: { slidesPerView: 1 },
          }}
          modules={[Pagination]}
          pagination={{
            clickable: true,
            el: ".spd2",
          }}
        >
          {iconboxItems.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="tf-icon-box">
                <div className="icon-box text-center">
                  <span
                    className={`icon ${item.icon} text-center text-purple bg-white rounded-circle p-3`}
                  />
                </div>
                <div className="content text-primary text-center">
                  <h6>{item.title}</h6>
                  {/* <p className="text-center text-caption-1">{item.description}</p> */}
                </div>
              </div>
            </SwiperSlide>
          ))}
          {/* <div className="sw-pagination-iconbox spd2 sw-dots type-circle justify-content-center" /> */}
        </Swiper>
      </div>
    </section>
  );
}
