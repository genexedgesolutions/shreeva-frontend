import { submitReview } from "@/api/review";
import React, { useState, useEffect } from "react";

export default function SubmitReviewModal({ productId, onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    rating: 5,
    comment: "",
    images: [],
    saveDetails: false,
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Handle image file selection
  const handleFileChange = (e) => {
    setFormData({ ...formData, images: [...e.target.files] });
  };

  // Submit review when component mounts (useEffect)
  useEffect(() => {
    const submitReviewData = async () => {
      if (!productId) return;

      setError("");
      setSuccess("");

      const reviewData = {
        product: productId,
        uid: "guest", // Modify if user authentication exists
        email: formData.email,
        name: formData.name || "Anonymous",
        userType: "guest",
        rating: formData.rating,
        comment: formData.comment,
        images: formData.images.map((file) => URL.createObjectURL(file)), // Convert images to URLs
      };
      try {
        const response = await submitReview(reviewData);
        setSuccess("Review submitted successfully!");
        console.log("Review Submitted:", response);
      } catch (err) {
        setError("Something went wrong. Please try again.");
      }
    };

    submitReviewData();
  }, [productId]); // Runs when `productId` changes

  // Close modal when the escape key is pressed
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  return (
    <div
      className="modal fade show"
      id="modalSubmitReview"
      tabIndex="-1"
      aria-labelledby="modalSubmitReviewLabel"
      aria-hidden="true"
      style={{ display: "block", background: "rgba(0, 0, 0, 0.5)" }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title">Submit a Review</h4>
            <button type="button" className="close" onClick={onClose}>
              &times;
            </button>
          </div>
          <div className="modal-body">
            {error && <p className="text-danger">{error}</p>}
            {success && <p className="text-success">{success}</p>}
            <form>
              <div className="mb-3">
                <label className="form-label">Your Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Your Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Your Email</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Your Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Rating</label>
                <input
                  type="number"
                  className="form-control"
                  name="rating"
                  value={formData.rating}
                  onChange={handleChange}
                  min="1"
                  max="5"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Comment</label>
                <textarea
                  className="form-control"
                  rows={4}
                  placeholder="Write your comment"
                  name="comment"
                  value={formData.comment}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Upload Images</label>
                <input
                  type="file"
                  className="form-control"
                  multiple
                  onChange={handleFileChange}
                />
              </div>
              {/* <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="saveDetails"
                  name="saveDetails"
                  checked={formData.saveDetails}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="saveDetails">
                  Save my details for next time
                </label>
              </div> */}
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={onClose}
                >
                  Close
                </button>
                <button type="submit" className="btn bg-primary text-white">
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
