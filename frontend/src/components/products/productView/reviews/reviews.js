import React, { useState, useEffect } from "react";
import Rating from "@prontopro/react-rating";
import Comment from "./comment";
import { getComments } from "../../../../utils/backend";
import { ProductParams } from "../../../../proto/products/products_pb";
import { GetProfile } from "../../../../utils/utils";

export default function Reviews({ id }) {
  const [opened, setopened] = useState(true);
  const [reviews, setreviews] = useState([]);

  const u = GetProfile();

  const GetReviews = () => {
    let params = new ProductParams();
    params.setId(id);

    getComments(params, (err, res) => {
      if (err) {
        console.log(err);
      } else {
        setreviews(res.toObject().commentsList);
      }
    });
  };

  useEffect(() => {
    GetReviews();
  }, []);

  return (
    <div className="mt-3">
      <h5 onClick={() => setopened(!opened)}>Reviews {opened ? "-" : "+"}</h5>
      <div className={opened ? "" : "d-none"}>
        <div
          className="mt-3"
          style={{ maxHeight: "100vh", overflowY: "scroll" }}
        >
          {reviews.length > 0
            ? reviews.map((r, i) => (
                <div key={i} className="mb-4">
                  <div className="d-flex align-items-center font-weight-bold">
                    {r.username}
                    <span className="ml-3">
                      <Rating
                        readonly
                        animateOnHover
                        disableAnimation
                        initialRate={r.rating}
                      />
                    </span>
                    <span className="ml-3">
                      {new Date(r.timestamp * 1000).toLocaleDateString()}
                    </span>
                  </div>
                  <p>{r.description}</p>
                </div>
              ))
            : "No reviews"}
        </div>
        {u.role === "user" ? (
          <Comment update={() => GetReviews()} id={id} username={u.username} />
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
