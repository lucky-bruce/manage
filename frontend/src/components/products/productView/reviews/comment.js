import React, { useState } from "react";
import { MDBBtn } from "mdbreact";
import Rating from "@prontopro/react-rating";
import { newComment } from "../../../../utils/backend";
import { Comment } from "../../../../proto/products/products_pb";

export default function CommentBlock(props) {
  const [description, setDescription] = useState("");
  const [rating, setrating] = useState(0);

  const NewComment = () => {
    let c = new Comment();
    c.setDescription(description);
    c.setUsername(props.username);
    c.setId(props.id);
    c.setRating(rating);
    c.setTimestamp(parseInt((new Date().getTime() / 1000).toFixed(0)));

    newComment(c, (err, res) => {
      if (err) {
        console.log(err);
      } else {
        console.log(res.toObject());
        props.update();
      }
    });
  };

  return (
    <div className="mt-3">
      <textarea
        placeholder={"Type your review here"}
        type="text"
        className="form-control"
        onChange={e => setDescription(e.target.value)}
      />
      <Rating onChange={v => setrating(v)} animateOnHover initialRate={0} />
      <MDBBtn onClick={() => NewComment()}>Comment</MDBBtn>
    </div>
  );
}
