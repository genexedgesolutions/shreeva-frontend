// frontend/src/components/CustomJewelryEnquiry.jsx
import React, { useMemo, useState, useEffect } from "react";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
// NOTE: add your prefix if needed -> `${API_BASE}/api/v1/demo-requests`
const ENDPOINT = `${API_BASE}/demo-requests`;

export default function CustomJewelryEnquiry({
  rightImage = "images/banner/mobile-banner5.png",
  title = "Design Your Dream Jewelry",
  subtitle = "Made-to-order pieces crafted to your story.",
}) {
  const [form, setForm] = useState({
    name: "", email: "", phone: "",
    jewelryType: "", metal: "", gemstone: "",
    budgetMin: "", budgetMax: "", timeline: "",
    message: "", agree: false,
  });
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  // ✅ toast/alert state
  const [status, setStatus] = useState({ type: "", msg: "" });
  const [showToast, setShowToast] = useState(false);

  // auto-hide toast after 3.2s
  useEffect(() => {
    if (!status.msg) return;
    setShowToast(true);
    const t = setTimeout(() => setShowToast(false), 3200);
    return () => clearTimeout(t);
  }, [status]);

  const canSubmit = useMemo(() => {
    const emailOk = /^\S+@\S+\.\S+$/.test(form.email);
    const phoneOk = form.phone ? /^[0-9+\-\s()]{7,}$/.test(form.phone) : true;
    return Boolean(form.name.trim() && emailOk && phoneOk && form.jewelryType && form.metal && form.agree);
  }, [form]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  };

  const handleFiles = (e) => {
    const list = Array.from(e.target.files || []);
    const filtered = list.filter(f => f.type.startsWith("image/")).slice(0, Math.max(0, 5 - files.length));
    setFiles(prev => [...prev, ...filtered]);
    const urls = filtered.map(f => URL.createObjectURL(f));
    setPreviews(p => [...p, ...urls]);
  };

  const removeFile = (i) => {
    setFiles(prev => prev.filter((_, idx) => idx !== i));
    setPreviews(prev => prev.filter((_, idx) => idx !== i));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!canSubmit || submitting) return;

    setSubmitting(true);
    setStatus({ type: "", msg: "" });

    try {
      let res;

      if (files.length > 0) {
        const fd = new FormData();
        Object.entries(form).forEach(([k, v]) => {
          fd.append(k, k === "agree" ? (v ? "true" : "false") : v ?? "");
        });
        files.forEach((file, idx) => fd.append("images", file, file.name || `image_${idx}.jpg`));

        res = await axios.post(ENDPOINT, fd, {
          headers: { "Content-Type": "multipart/form-data", Accept: "application/json" },
        });
      } else {
        res = await axios.post(ENDPOINT, { ...form, agree: !!form.agree }, {
          headers: { "Content-Type": "application/json", Accept: "application/json" },
        });
      }

      if (!res?.data?.success) throw new Error(res?.data?.message || "Failed to submit enquiry");

      // ✅ success toast
      setStatus({ type: "success", msg: "Thank you! We’ll contact you within 24 hours." });

      previews.forEach(u => URL.revokeObjectURL(u));
      setFiles([]); setPreviews([]);
      setForm({
        name: "", email: "", phone: "",
        jewelryType: "", metal: "", gemstone: "",
        budgetMin: "", budgetMax: "", timeline: "",
        message: "", agree: false,
      });
    } catch (err) {
      const msg = err?.response?.data?.message || err?.message || "Something went wrong.";
      // ❌ error toast
      setStatus({ type: "error", msg });
      console.error("Enquiry POST failed:", {
        url: ENDPOINT,
        status: err?.response?.status,
        data: err?.response?.data,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="customj-wrap">
      <div className="cj-container">
        {/* LEFT: FORM */}
        <div className="cj-left">
          <h2 className="cj-title">{title}</h2>
          <p className="cj-subtitle">{subtitle}</p>

          <form onSubmit={handleSubmit} className="cj-form" noValidate>
            {/* ... your existing fields unchanged ... */}
            {/* Name + Email */}
            <div className="cj-grid">
              <div className="cj-field">
                <label>Name *</label>
                <input name="name" value={form.name} onChange={handleChange} required />
              </div>
              <div className="cj-field">
                <label>Email *</label>
                <input type="email" name="email" value={form.email} onChange={handleChange} required />
              </div>
            </div>

            {/* Phone + Type */}
            <div className="cj-grid">
              <div className="cj-field">
                <label>Phone</label>
                <input name="phone" value={form.phone} onChange={handleChange} />
              </div>
              <div className="cj-field">
                <label>Jewelry Type *</label>
                <select name="jewelryType" value={form.jewelryType} onChange={handleChange} required>
                  <option value="">Select</option>
                  <option value="Ring">Ring</option>
                  <option value="Necklace">Necklace</option>
                  <option value="Bangle">Bangle</option>
                  <option value="Bracelet">Bracelet</option>
                  <option value="Earrings">Earrings</option>
                  <option value="Pendant">Pendant</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            {/* Metal + Gemstone */}
            <div className="cj-grid">
              <div className="cj-field">
                <label>Metal *</label>
                <select name="metal" value={form.metal} onChange={handleChange} required>
                  <option value="">Select</option>
                  <option value="Gold">Gold</option>
                  <option value="White Gold">White Gold</option>
                  <option value="Rose Gold">Rose Gold</option>
                  <option value="Platinum">Platinum</option>
                  <option value="Silver">Silver</option>
                </select>
              </div>
              <div className="cj-field">
                <label>Gemstone</label>
                <input name="gemstone" value={form.gemstone} onChange={handleChange} />
              </div>
            </div>

            {/* Budget + Timeline */}
            <div className="cj-grid">
              <div className="cj-field">
                <label>Budget Range (₹)</label>
                <div className="cj-inline">
                  <input type="number" name="budgetMin" value={form.budgetMin} onChange={handleChange} placeholder="Min" min="0" />
                  <span className="cj-sep">—</span>
                  <input type="number" name="budgetMax" value={form.budgetMax} onChange={handleChange} placeholder="Max" min="0" />
                </div>
              </div>
              <div className="cj-field">
                <label>Timeline</label>
                <select name="timeline" value={form.timeline} onChange={handleChange}>
                  <option value="">Select</option>
                  <option value="1-2 weeks">1–2 weeks</option>
                  <option value="3-4 weeks">3–4 weeks</option>
                  <option value="5-8 weeks">5–8 weeks</option>
                  <option value="Flexible">Flexible</option>
                </select>
              </div>
            </div>

            {/* Message */}
            <div className="cj-field">
              <label>Describe your idea</label>
              <textarea name="message" value={form.message} onChange={handleChange} rows={4} />
            </div>

            {/* Files */}
            <div className="cj-field" hidden>
              <label>Upload inspiration (up to 5 images)</label>
              <input type="hidden" accept="image/*" multiple onChange={handleFiles} />
              {previews.length > 0 && (
                <div className="cj-previews">
                  {previews.map((src, i) => (
                    <div className="cj-thumb" key={i}>
                      <img src={src} alt={`inspo-${i}`} />
                      <button type="button" className="cj-remove" onClick={() => removeFile(i)}>×</button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Consent */}
            <label className="cj-check">
              <input type="checkbox" name="agree" checked={form.agree} onChange={handleChange} required />
              <span>I agree to be contacted on WhatsApp / Email about my enquiry.</span>
            </label>

            {/* Submit */}
            <button type="submit" className="cj-submit" disabled={!canSubmit || submitting}>
              {submitting ? "Submitting…" : "Request a Quote"}
            </button>
          </form>
        </div>

        {/* RIGHT */}
        <div className="cj-right">
          <div className="cj-image-wrap"><img src={rightImage} alt="Custom jewelry showcase" /></div>
          <ul className="cj-highlights">
            <li>✔ Free 3D renders & design consultation</li>
            <li>✔ Certified gemstones & hallmarking</li>
            <li>✔ Doorstep delivery & secure payments</li>
          </ul>
        </div>
      </div>

      {/* Toast / Alert */}
      {showToast && status.msg && (
        <div className={`cj-toast ${status.type === "success" ? "ok" : "err"}`}>
          <div className="cj-toast-msg">{status.msg}</div>
          <button className="cj-toast-x" onClick={() => setShowToast(false)} aria-label="Close">×</button>
        </div>
      )}

      {/* Styles (additions at bottom for toast) */}
            <style jsx>{`
        .customj-wrap {
          padding: 24px 0 48px;
          background: #fff;
        }
        .cj-container {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 28px;
          align-items: start;
          max-width: 1140px;
          margin: 0 auto;
          padding: 0 16px;
        }
        @media (max-width: 992px) {
          .cj-container {
            grid-template-columns: 1fr;
          }
        }

        .cj-title {
          margin: 0 0 6px;
          font-size: 28px;
          font-weight: 700;
          color: #1a1a1a;
        }
        .cj-subtitle {
          margin: 0 0 18px;
          color: #555;
        }

        .cj-form {
          background: #fff;
          border: 1px solid #eee;
          border-radius: 14px;
          padding: 16px;
          box-shadow: 0 8px 24px rgba(0,0,0,0.05);
        }
        .cj-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }
        @media (max-width: 576px) {
          .cj-grid { grid-template-columns: 1fr; }
        }

        .cj-field {
          display: flex;
          flex-direction: column;
          gap: 6px;
          margin-bottom: 12px;
        }
        .cj-field label {
          font-size: 13px;
          color: #333;
          font-weight: 600;
        }
        .cj-field input,
        .cj-field select,
        .cj-field textarea {
          border: 1px solid #e6e6e6;
          border-radius: 10px;
          padding: 10px 12px;
          font-size: 14px;
          outline: none;
          transition: border 0.2s, box-shadow 0.2s;
          background: #fafafa;
        }
        .cj-field textarea { resize: vertical; }
        .cj-field input:focus,
        .cj-field select:focus,
        .cj-field textarea:focus {
          border-color: #c29863;
          box-shadow: 0 0 0 3px rgba(194,152,99,0.15);
          background: #fff;
        }

        .cj-inline {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: center;
          gap: 8px;
        }
        .cj-sep {
          color: #888;
        }

        .cj-previews {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 8px;
          margin-top: 8px;
        }
        @media (max-width: 576px) {
          .cj-previews { grid-template-columns: repeat(3, 1fr); }
        }
        .cj-thumb {
          position: relative;
          border-radius: 10px;
          overflow: hidden;
          aspect-ratio: 1 / 1;
          border: 1px solid #eee;
        }
        .cj-thumb img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .cj-remove {
          position: absolute;
          top: 6px;
          right: 6px;
          width: 22px;
          height: 22px;
          border-radius: 999px;
          border: none;
          background: #fff;
          box-shadow: 0 2px 8px rgba(0,0,0,0.15);
          cursor: pointer;
          line-height: 1;
          font-weight: 700;
        }

        .cj-check {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          margin: 6px 0 12px;
          font-size: 13px;
          color: #444;
        }

        .cj-status {
          padding: 10px 12px;
          border-radius: 10px;
          margin-bottom: 10px;
          font-size: 14px;
        }
        .cj-status.ok { background: #e6f6ea; color: #1d7a36; border: 1px solid #bde5c8; }
        .cj-status.err { background: #fdecec; color: #b12a2a; border: 1px solid #f5b5b5; }

        .cj-submit {
          width: 100%;
          height: 44px;
          border-radius: 999px;
          border: 1px solid #c29863;
          background: linear-gradient(90deg, #c29863, #e7c9a0);
          color: #1a1a1a;
          font-weight: 700;
          letter-spacing: 0.2px;
          cursor: pointer;
          transition: transform 0.15s ease, box-shadow 0.15s ease;
        }
        .cj-submit:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        .cj-submit:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 10px 22px rgba(194,152,99,0.24);
        }

        .cj-right {
          position: sticky;
          top: 16px;
        }
        .cj-image-wrap {
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 12px 28px rgba(0,0,0,0.08);
          border: 1px solid #eee;
        }
        .cj-image-wrap img {
          display: block;
          width: 100%;
          height: auto;
          object-fit: cover;
        }
        .cj-highlights {
          list-style: none;
          padding: 0;
          margin: 14px 0 0;
          color: #333;
          display: grid;
          gap: 6px;
        }
          /* Toast styles */
        .cj-toast {
          position: fixed;
          top: 16px;
          right: 16px;
          z-index: 9999;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 12px 14px;
          border-radius: 12px;
          border: 1px solid transparent;
          box-shadow: 0 10px 24px rgba(0,0,0,0.12);
          animation: cj-slidein 220ms ease-out;
        }
        .cj-toast.ok {
          background: #e7f6ee;
          border-color: #bfe6cd;
          color: #135a33;
        }
        .cj-toast.err {
          background: #fdecec;
          border-color: #f5b5b5;
          color: #8f1f1f;
        }
        .cj-toast-x {
          background: transparent;
          border: 0;
          font-size: 18px;
          line-height: 1;
          cursor: pointer;
          color: inherit;
          padding: 0 4px;
        }
        .cj-toast-msg { font-weight: 600; }

        @keyframes cj-slidein {
          from { transform: translateY(-8px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </section>
  );
}
