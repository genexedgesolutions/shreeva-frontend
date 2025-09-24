import React, { useState } from "react";

import ReviewSorting from "./ReviewSorting";
import Slider4 from "../sliders/Slider4";
import SubmitReviewModal from "@/components/modals/SubmitReviewModal";
export default function Reviews({ product }) {
  const totalReviews = product.reviews.length;
  const [isReviewModalOpen, setReviewModalOpen] = useState(false);
  const openReviewModal = () => setReviewModalOpen(true);
  const closeReviewModal = () => setReviewModalOpen(false);
  // Count occurrences of each rating (1-5)
  const ratingCount = [1, 2, 3, 4, 5].map((rating) => {
    return product.reviews.filter((review) => review.rating === rating).length;
  });
  return (
    <>
      <div className="tab-reviews-heading">
        {" "}
        <div className="top">
          <div className="text-center">
            <div className="number title-display text-primary">
              {product.ratings.average}
            </div>
            <div className="list-star text-yellow">
              {Array.from({ length: 5 }).map((_, index) => (
                <i
                  key={index}
                  className={`icon icon-star ${
                    index < product.ratings.average ? "filled" : ""
                  }`}
                />
              ))}
            </div>
            <p>({product.ratings.totalReviews} Ratings)</p>
          </div>
          <div className="rating-score">
            {ratingCount.reverse().map((count, index) => {
              const rating = 5 - index; // Reverse from 5 to 1
              const percentage =
                totalReviews > 0 ? (count / totalReviews) * 100 : 0;

              return (
                <div className="item" key={rating}>
                  <div className="number-1 text-caption-1">{rating}</div>
                  <i className="icon icon-star" />
                  <div className="line-bg">
                    <div style={{ width: `${percentage}%` }} />
                  </div>
                  <div className="number-2 text-caption-1">{count}</div>
                </div>
              );
            })}
          </div>
        </div>
        <div>
          <div className="btn-style-4 text-btn-uppercase letter-1 btn-comment-review btn-cancel-review">
            Cancel Review
          </div>
          <div
            className="btn-style-4 text-btn-uppercase letter-1 btn-comment-review btn-write-review"
            onClick={openReviewModal}
          >
            Write a review
          </div>
          {isReviewModalOpen && (
            <SubmitReviewModal
              productId={product.id}
              onClose={closeReviewModal}
            />
          )}
        </div>
      </div>
      <div className="reply-comment style-1 cancel-review-wrap">
        <div className="d-flex mb_24 gap-20 align-items-center justify-content-between flex-wrap">
          <h4 className="">{totalReviews} Reviews</h4>
          <div className="d-flex align-items-center gap-12">
            <div className="text-caption-1">Sort by:</div>
            <ReviewSorting />
          </div>
        </div>
        <div className="reply-comment-wrap">
          {product.reviews.map((review) => (
            <div key={review._id} className="reply-comment-item">
              <div className="user">
                <div className="image">
                  <img
                    alt="User Avatar"
                    src={`/images/avatar/${
                      review.uid === "anonymous" ? "user-1.jpg" : "user.jpg"
                    }`}
                    width={120}
                    height={120}
                  />
                </div>
                <div>
                  <div>
                    <h6>
                      <a href="#" className="link">
                        {review.name} <span>{review.verifiedPurchase}</span>
                        {review.verifiedPurchase && (
                          <div className="icon">
                            <i className="icon-check" />
                          </div>
                        )}
                        {/* {review.comment.split(" ").slice(0, 10).join(" ")} */}
                      </a>
                    </h6>
                  </div>
                  <div className="day text-black-2 text-caption-1">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
              <p className="text-black">{review.comment}</p>
              {review.images && review.images.length > 0 && (
                <Slider4
                  slideItems={review.images}
                  firstItem={review.images[0]}
                />
              )}
              {/* Brand Reply Condition */}
              {review.reply && (
                <div className="reply-comment-item type-reply">
                  <div className="user">
                    <div className="image">
                      <img
                        alt="Brand Avatar"
                        src="/images/avatar/user-modave.jpg"
                        width={104}
                        height={104}
                      />
                    </div>
                    <div>
                      <h6>
                        <a href="#" className="link">
                          Reply from BeauBless
                        </a>
                      </h6>
                      <div className="day text-black-2 text-caption-1">
                        {new Date(review.brandReplyDate).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <p className="text-black">{review.brandReply}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
