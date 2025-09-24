import React, { useRef, useState } from "react";
import { sendContactMessage } from "../../api/contact";

export default function Contact3() {
  const formRef = useRef();
  const [success, setSuccess] = useState(true);
  const [showMessage, setShowMessage] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  const handleShowMessage = () => {
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 2000);
  };

  const sendMail = async (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    };

    console.log("Form Data:", data);

    try {
      console.log("Before Request");

      const res = await sendContactMessage(data);
      console.log("After Request", res);

      if (res.success) {
        setSuccess(true);
        setResponseMessage(res.message || "Message received successfully.");
        formRef.current.reset();
      } else {
        setSuccess(false);
        setResponseMessage("Something went wrong, please try again.");
      }
    } catch (err) {
      console.error("Error:", err);
      setSuccess(false);
      setResponseMessage(err.message || "Something went wrong.");
    } finally {
      handleShowMessage();
    }
  };

  return (
    <section className="flat-spacing pt-0 mt-5">
      <div className="container">
        <div className="heading-section text-center">
          <h3 className="heading text-primary">📩 Get in Touch with Us!</h3>
          <p className="subheading">
            Have questions or need assistance? Our team is here to help! Fill
            out the form below, and we’ll get back to you as soon as possible.
            💖
          </p>
        </div>
        <div
          className={`tfSubscribeMsg footer-sub-element ${
            showMessage ? "active" : ""
          }`}
        >
          {success ? (
            <p style={{ color: "rgb(52, 168, 83)" }}>{responseMessage}</p>
          ) : (
            <p style={{ color: "red" }}>{responseMessage}</p>
          )}
        </div>
        <form
          onSubmit={sendMail}
          ref={formRef}
          id="contactform"
          className="form-leave-comment"
        >
          <div className="wrap">
            <div className="cols">
              <fieldset>
                <input
                  type="text"
                  placeholder="Your Name*"
                  name="name"
                  required
                />
              </fieldset>
              <fieldset>
                <input
                  type="email"
                  placeholder="Your Email*"
                  name="email"
                  required
                />
              </fieldset>
            </div>
            <fieldset>
              <textarea
                name="message"
                placeholder="Your Message*"
                rows={4}
                required
              ></textarea>
            </fieldset>
          </div>
          <div className="button-submit send-wrap justify-content-center text-center">
            <button className="tf-btn" type="submit">
              <span className="text text-button">Send message</span>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
