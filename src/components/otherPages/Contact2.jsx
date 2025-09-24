import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
export default function Contact2() {
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

    try {
      const res = await axios.post("https://api.beaubless.com/api/v1/contact", formData);
      if (res.status === 200) {
        setSuccess(true);
        setResponseMessage(res.data.message || "Message received successfully.");
        formRef.current.reset();
      } else {
        setSuccess(false);
        setResponseMessage("Something went wrong, please try again.");
      }
    } catch (err) {
      setSuccess(false);
      setResponseMessage(err.response?.data?.message || "Something went wrong.");
    } finally {
      handleShowMessage();
    }
  };
  return (
    <section className="flat-spacing">
      <div className="container">
        <div className="contact-us-content">
          <div className="left">
            <h4>Get In Touch</h4>
            <p className="text-secondary-2">
              Use the form below to get in touch with the sales team
            </p>
            <div
              className={`tfSubscribeMsg footer-sub-element ${showMessage ? "active" : ""}`}
            >
              <p style={{ color: success ? "rgb(52, 168, 83)" : "red" }}>
                {responseMessage}
              </p>
            </div>
            <form onSubmit={sendMail} ref={formRef} id="contactform" className="form-leave-comment">
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
                    rows={4}
                    placeholder="Your Message*"
                    required
                  />
                </fieldset>
              </div>
              <div className="button-submit send-wrap">
                <button className="tf-btn btn-fill" type="submit">
                  <span className="text text-button">Send message</span>
                </button>
              </div>
            </form>
          </div>
          <div className="right">
            <h4>Information</h4>
            <div className="mb_20">
              <div className="text-title mb_8">Phone:</div>
              <p className="text-secondary">+91 85870 85402</p>
            </div>
            <div className="mb_20">
              <div className="text-title mb_8">Email:</div>
              <p className="text-secondary">sales@beaubless.com</p>
            </div>
            <div className="mb_20">
              <div className="text-title mb_8">Address:</div>
              <p className="text-secondary">Delhi, India</p>
            </div>
            <div>
              <div className="text-title mb_8">Open Time:</div>
              <p className="mb_4 open-time">
                <span className="text-secondary">Mon - Sat:</span> 7:30am - 8:00pm PST
              </p>
              <p className="open-time">
                <span className="text-secondary">Sunday:</span> 9:00am - 5:00pm PST
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
