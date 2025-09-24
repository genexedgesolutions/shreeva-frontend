import { useState, useEffect } from "react";

export default function Comments({ comments }) {
  const [loading, setLoading] = useState(true);
  const [finalComments, setFinalComments] = useState([]);

  useEffect(() => {
    if (!comments || comments.length === 0) {
      // Dummy comments when no actual comments exist
      setFinalComments([
        {
          userName: "Sunil Kumar",
          email: "sunil@gmail.com",
          comment: "This is an amazing blog! Thanks for sharing.",
          createdAt: new Date(),
        },
        {
          userName: "Simran",
          email: "simran@gmail.com",
          comment: "I found this very helpful. Keep posting!",
          createdAt: new Date(),
        },
      ]);
    } else {
      setFinalComments(comments);
    }
    setLoading(false); // Stop loading after checking comments
  }, [comments]);

  return (
    <div className="reply-comment">
      <h4 className="reply-comment-heading">{finalComments.length} Comments</h4>

      {loading ? (
        <p>Loading comments...</p>
      ) : (
        <div className="reply-comment-wrap">
          {finalComments.map((comment, index) => (
            <div
              key={index}
              className={`reply-comment-item ${
                index % 2 !== 0 ? "type-reply" : ""
              }`}
            >
              <div className="image">
                <img
                  alt={comment.userName}
                  src={`/images/avatar/user-${(index % 5) + 1}.jpg`}
                  width={90}
                  height={113}
                />
              </div>
              <div className="content">
                <div>
                  <h6>
                    <a href="#" className="link">
                      {comment.userName}
                    </a>
                  </h6>
                  <div className="day text-caption-1">
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </div>
                </div>
                <p>{comment.comment}</p>
                <div>
                  <a className="text-button" href="#">
                    Reply
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
