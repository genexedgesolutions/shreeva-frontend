import React from "react";

export default function StoreLocations3() {
  return (
    <section className="mt-0">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="contact-us-map">
              <div className="wrap-map">
                <div
                  id="map-contact"
                  className="map-contact"
                  data-map-zoom={16}
                  data-map-scroll="true"
                >
                  {/* <iframe
                    src="https://www.google.com/maps/place/Gaur+Cascades+A-Block/@28.702934,77.4235721,17z/data=!3m1!4b1!4m6!3m5!1s0x390cf11d0eba5643:0x5dc468996567c6f7!8m2!3d28.702934!4d77.426147!16s%2Fg%2F1hm2080cy?entry=ttu&g_ep=EgoyMDI1MDMwNC4wIKXMDSoASAFQAw%3D%3D"
                    width={600}
                    height={450}
                    style={{ border: 0, width: "100%", height: "100%" }}
                    allowFullScreen=""
                    loading="lazy"
                  /> */}
                  <img src="/images/banner/contact.jpg" className="rounded" style={{ border: 0,borderRadius:'10px',width: "100%", height: "100%" }}/>
                 
                </div>
                 
              </div>
              <div className="right">
                <h4>Information</h4>
                <div className="mb_20">
                  <div className="text-title mb_8">Phone:</div>
                  <p className="text-primary">+91 9990531210</p>
                </div>
                <div className="mb_20">
                  <div className="text-title mb_8">Email:</div>
                  <p className="text-primary">care@beaubless.com</p>
                </div>
                <div className="mb_20">
                  <div className="text-title mb_8">Address:</div>
                  <p className="text-primary">
                  Raj Nagar Extension Road, Ghaziabad, Uttar Pradesh, India, 201017

                  </p>
                </div>
                <div>
                  <div className="text-title mb_8">Open Time:</div>
                  <p className="mb_4 open-time">
                    <span className="text-primary">Mon - Sat:</span> 7:30am -
                    8:00pm PST
                  </p>
                  {/* <p className="open-time">
                    <span className="text-secondary">Sunday:</span> 9:00am -
                    5:00pm PST
                  </p> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
