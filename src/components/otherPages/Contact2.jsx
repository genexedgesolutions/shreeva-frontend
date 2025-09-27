"use client";
import React, { useRef, useState } from "react";
import axios from "axios";

export default function Contact2() {
  const formRef = useRef(null);
  const [success, setSuccess] = useState(true);
  const [showMessage, setShowMessage] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleShowMessage = () => {
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 2600);
  };

 const sendMail = async (e) => {
  e.preventDefault();
  if (loading) return;

  const fd = new FormData(formRef.current);
  const payload = {
    name: fd.get("name")?.toString().trim(),
    email: fd.get("email")?.toString().trim(),
    message: fd.get("message")?.toString().trim(),
    phone: fd.get("phone")?.toString().trim() || "",
  };

  // basic guard
  if (!payload.name || !payload.email || !payload.message) {
    setSuccess(false);
    setResponseMessage("Please fill all required fields.");
    handleShowMessage();
    return;
  }

  setLoading(true);
  try {
    const res = await axios.post(
      "https://backend.shreevajewels.com/api/v1/contact",
      payload,
      { headers: { "Content-Type": "application/json", Accept: "application/json" } }
    );

    if (res.status === 200) {
      setSuccess(true);
      setResponseMessage(res.data?.message || "Thanks! We’ve received your message.");
      formRef.current.reset();
    } else {
      setSuccess(false);
      setResponseMessage("Something went wrong, please try again.");
    }
  } catch (err) {
    setSuccess(false);
    setResponseMessage(err.response?.data?.message || "Something went wrong. Please try again later.");
  } finally {
    setLoading(false);
    handleShowMessage();
  }
};


  return (
    <div id="contact">
      <section className="contact-section">
        <div className="container">
          {/* Header */}
          <div className="hero">
            <h2>Get In Touch</h2>
            <p>We’ll get back within 1–2 business days.</p>
          </div>

          <div className="grid">
            {/* Left: Form */}
            <div className="card form-card">
              {/* Inline toast */}
              <div
                className={`toast ${showMessage ? "show" : ""} ${success ? "ok" : "err"}`}
                aria-live="polite"
                role="status"
              >
                <span>{responseMessage}</span>
              </div>

              <form onSubmit={sendMail} ref={formRef} id="contactform">
                <div className="row">
                  <label>
                    <span>Your Name*</span>
                    <input type="text" name="name" required placeholder="e.g., Aanya Mehta" />
                  </label>

                  <label>
                    <span>Your Email*</span>
                    <input type="email" name="email" required placeholder="e.g., you@example.com" />
                  </label>
                </div>

                <label className="block">
                  <span>Phone (optional)</span>
                  <input type="tel" name="phone" placeholder="+91 9XXXXXXXXX" />
                </label>

                <label className="block">
                  <span>Your Message*</span>
                  <textarea name="message" rows={5} required placeholder="Tell us about your query…" />
                </label>

                {/* Honeypot (spam trap) */}
                <input type="text" name="company" className="hp" tabIndex={-1} autoComplete="off" />

                <button className={`btn ${loading ? "loading" : ""}`} type="submit" disabled={loading}>
                  {loading ? (
                    <>
                      <svg aria-hidden="true" className="spin" viewBox="0 0 100 101" fill="none">
                        <path
                          d="M100 50.59C100 78.21 77.61 100.59 50 100.59C22.39 100.59 0 78.21 0 50.59C0 22.98 22.39 0.59 50 0.59C77.61 0.59 100 22.98 100 50.59Z"
                          fill="#eaeaea"
                        />
                        <path
                          d="M93.97 39.04C96.39 38.40 97.86 35.91 97.01 33.55C95.29 28.82 92.87 24.37 89.82 20.35C85.85 15.12 80.88 10.72 75.21 7.41C69.54 4.10 63.28 1.94 56.77 1.05C51.77 0.37 46.70 0.45 41.73 1.28C39.26 1.69 37.81 4.20 38.45 6.62C39.09 9.05 41.57 10.47 44.05 10.11C47.85 9.55 51.72 9.53 55.54 10.05C60.86 10.78 65.99 12.55 70.63 15.26C75.27 17.96 79.33 21.56 82.58 25.84C84.92 28.91 86.80 32.29 88.18 35.88C89.08 38.22 91.54 39.68 93.97 39.04Z"
                          fill="currentColor"
                        />
                      </svg>
                      Sending…
                    </>
                  ) : (
                    <>Send message</>
                  )}
                </button>
              </form>
            </div>

            {/* Right: Info */}
            <div className="card info-card">
              <div className="brand">
                <div className="badge">Official Store</div>
                <h3>Shreeva Jewels</h3>
              </div>

              <ul className="info">
                <li>
                  <span className="label">Phone</span>
                  <a href="tel:+919104235510">+91 91042 35510</a>
                </li>
                <li>
                  <span className="label">Email</span>
                  <a href="mailto:info@shreevajewels.com">info@shreevajewels.com</a>
                </li>
                <li>
                  <span className="label">Address</span>
                  <span>Mumbai, India</span>
                </li>
                <li>
                  <span className="label">Open Time</span>
                  <span>Mon–Sat: 10:00 AM – 7:00 PM IST</span>
                </li>
                <li>
                  <span className="label">Sunday</span>
                  <span>Closed</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Scoped styles only under #contact */}
      <style jsx>{`
        #contact {
          --gold: #c8a24a;
          --ink: #111827;
          --muted: #6b7280;
          --border: #eef0f3;
          --ring: rgba(17, 24, 39, 0.06);
        }
        #contact .contact-section {
          padding: clamp(32px, 4vw, 64px) 0;
          background:
            radial-gradient(1200px 400px at 10% -10%, #f3f4f7 0%, transparent 60%),
            radial-gradient(1200px 400px at 90% -10%, #f3f4f7 0%, transparent 60%),
            #fff;
        }
        #contact .container {
          max-width: 1120px;
          margin: 0 auto;
          padding: 0 20px;
        }
        #contact .hero {
          text-align: center;
          margin-bottom: 28px;
        }
        #contact .hero h2 {
          font-size: clamp(24px, 3vw, 34px);
          font-weight: 700;
          letter-spacing: 0.2px;
        }
        #contact .hero p {
          color: var(--muted);
          margin-top: 6px;
        }
        #contact .grid {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: clamp(16px, 2.5vw, 28px);
        }
        @media (max-width: 992px) {
          #contact .grid { grid-template-columns: 1fr; }
        }
        #contact .card {
          border-radius: 18px;
          background: rgba(255, 255, 255, 0.86);
          backdrop-filter: saturate(160%) blur(6px);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.06);
          border: 1px solid var(--border);
        }
        #contact .form-card,
        #contact .info-card {
          padding: clamp(16px, 2.5vw, 28px);
        }
        /* Toast */
        #contact .toast {
          max-height: 0;
          overflow: hidden;
          transition: all 300ms ease;
          border-radius: 12px;
          padding: 0 16px;
          border: 1px solid transparent;
          margin-bottom: 12px;
          font-size: 14px;
        }
        #contact .toast.show {
          max-height: 80px;
          padding: 10px 16px;
        }
        #contact .toast.ok {
          background: #ecfdf5;
          border-color: #a7f3d0;
          color: #065f46;
        }
        #contact .toast.err {
          background: #fef2f2;
          border-color: #fecaca;
          color: #7f1d1d;
        }
        #contact form {
          display: grid;
          gap: 16px;
        }
        #contact .row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        @media (max-width: 640px) {
          #contact .row { grid-template-columns: 1fr; }
        }
        #contact label.block { display: block; }
        #contact label span {
          display: inline-block;
          margin-bottom: 6px;
          font-size: 13px;
          color: var(--muted);
        }
        #contact input,
        #contact textarea {
          width: 100%;
          border: 1px solid #e5e7eb;
          border-radius: 14px;
          padding: 12px 14px;
          outline: none;
          transition: box-shadow 160ms ease, border-color 160ms ease, transform 80ms ease;
          background: #fff;
        }
        #contact textarea {
          resize: vertical;
          min-height: 120px;
        }
        #contact input:focus,
        #contact textarea:focus {
          border-color: var(--ink);
          box-shadow: 0 0 0 6px var(--ring);
        }
        #contact input:hover,
        #contact textarea:hover {
          border-color: #d1d5db;
        }
        #contact .hp {
          position: absolute;
          left: -9999px;
          opacity: 0;
          height: 0;
          width: 0;
        }
        #contact .btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 12px 20px;
          border-radius: 14px;
          font-weight: 700;
          border: 1px solid var(--ink);
          background:
            linear-gradient(0deg, rgba(200,162,74,0.08), rgba(200,162,74,0.08)),
            linear-gradient(135deg, var(--ink), #1f2937);
          color: #fff;
          cursor: pointer;
          transition: transform 120ms ease, box-shadow 160ms ease, opacity 160ms ease, filter 160ms ease;
          will-change: transform;
        }
        #contact .btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 14px 28px rgba(17, 24, 39, 0.18);
          filter: saturate(110%);
        }
        #contact .btn:active {
          transform: translateY(0);
          box-shadow: 0 8px 18px rgba(17, 24, 39, 0.14);
        }
        #contact .btn.loading {
          opacity: 0.75;
          cursor: not-allowed;
        }
        #contact .btn .spin {
          width: 16px;
          height: 16px;
          animation: spin 0.8s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        /* Info side */
        #contact .brand {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }
        #contact .badge {
          font-size: 12px;
          letter-spacing: 0.4px;
          padding: 6px 10px;
          border-radius: 999px;
          background: var(--gold);
          color: #111;
          border: 1px solid #e5d6a1;
        }
        #contact .brand h3 {
          margin: 0;
          font-size: 20px;
        }
        #contact .info {
          list-style: none;
          padding: 0;
          margin: 0;
          display: grid;
          gap: 12px;
        }
        #contact .info li {
          display: grid;
          grid-template-columns: 140px 1fr;
          gap: 10px;
          align-items: baseline;
        }
        #contact .label {
          color: var(--muted);
          font-size: 14px;
        }
        #contact .info a {
          color: var(--ink);
          text-decoration: none;
          border-bottom: 1px dashed transparent;
          transition: border-color 160ms ease;
        }
        #contact .info a:hover {
          border-color: var(--ink);
        }
      `}</style>
    </div>
  );
}
