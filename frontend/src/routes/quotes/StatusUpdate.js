import React, { useState, useEffect } from "react";
import { GetStatus, GetProfile, isEmpty } from "../../utils/utils";
import { GetQuote, changeShippingStatus } from "../../utils/backend";
import { Button } from "react-bootstrap";
import Countdown from "react-countdown-now";
import { navigate, A } from "hookrouter";

export default function StatusUpdate({ id }) {
  const [quote, setquote] = useState({});

  useEffect(() => {
    GetQuote(id, (err, res) => {
      if (err) {
      } else {
        setquote(res.toObject());
      }
    });
    //eslint-disable-next-line
  }, []);

  const renderer = ({ seconds, completed }) => {
    if (completed) {
      // Render a completed state
      return "";
    } else {
      // Render a countdown
      return <div>{seconds} seconds left</div>;
    }
  };

  const handleSuccess = () => {
    changeShippingStatus(id, (err, res) => {
      // navigate("/");
      if (err) {
        console.log(err);
      } else {
        navigate("/", true);
        console.log(res.toObject());
      }
    });
  };

  let body = (
    <div>
      <div className="modal-body">
        {GetProfile().firstName}, You are about to change the status of this
        order from "{GetStatus(quote.status)}" to "{GetStatus(quote.status + 1)}
        "
        <Countdown
          onComplete={() => navigate("/")}
          date={Date.now() + 15000}
          renderer={renderer}
        />
      </div>
      <div className="modal-footer">
        <Button
          onClick={() => handleSuccess()}
          variant="success"
          className="mr-3"
        >
          Yes
        </Button>
        <A href="/">
          <Button variant="danger">No</Button>
        </A>
      </div>
    </div>
  );
  if (isEmpty(quote)) {
    body = (
      <div>
        <div className="modal-body">Bad link</div>
        <div className="modal-footer">
          <Button>Back to main page</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid p-0">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Status update
            </h5>
          </div>
          {body}
        </div>
      </div>
    </div>
  );
}
