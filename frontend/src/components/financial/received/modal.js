import React, { useState } from "react";
import $ from "jquery";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { PaymentParams } from "../../../proto/financial/financial_pb";
import { pay } from "../../../utils/backend";

export default function Modal(props) {
  const [amount, setAmount] = useState(0);

  function NewPayment() {
    let p = new PaymentParams();

    p.setId(props.id);
    p.setAmount(amount);

    pay(p, (err, res) => {
      if (err) {
        console.log(err);
      } else {
        $("#exampleModal").modal("toggle");
        props.onSubmit();
      }
    });
  }

  return (
    <div>
      <button
        data-toggle="modal"
        data-target="#exampleModal"
        className="btn btn-sm m-0 "
        style={{ backgroundColor: "lightgreen", color: "white" }}
      >
        Pay <FontAwesomeIcon icon={faPlus} />
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Payment form
              </h5>
              <button className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <h6>Enter amount</h6>
              <div className="mb-4">
                <input
                  value={amount}
                  onChange={e => setAmount(e.target.value)}
                  type="number"
                  min="0"
                  className="form-control w-50 "
                />
                {amount > props.max ? (
                  <p className="pb-0 invalid position-absolute">
                    Max value is {props.max}
                  </p>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="modal-footer">
              <button
                disabled={amount > props.max}
                onClick={() => NewPayment()}
                className="btn-success btn"
              >
                Pay
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
