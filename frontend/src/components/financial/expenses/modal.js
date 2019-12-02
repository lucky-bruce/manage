import React, { useState, useReducer } from "react";
import $ from "jquery";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { expenseInput, GetGRPCExpense } from "../../../utils/grpc";
import DatePicker from "react-datepicker";
import { Checkbox } from "../../ui/index";
import { newExpense } from "../../../utils/backend";

export default function Modal(props) {
  const [opened, setOpened] = useState(false);
  const [repeated, setrepeated] = useState(false);

  const [userInput, setUserInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    expenseInput
  );

  const handleChange = (name, value) => {
    setUserInput({ [name]: value });
  };

  function New() {
    let e = GetGRPCExpense(userInput);

    newExpense(e, (err, res) => {
      if (!err) {
        $("#exampleModal").modal("toggle");
        props.update();
      }
    });
  }

  return (
    <div>
      <button
        data-toggle="modal"
        data-target="#exampleModal"
        className="btn-warning btn "
      >
        New <FontAwesomeIcon icon={faPlus} />
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
                New expense
              </h5>
              <button className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div>
                <h6>Enter description</h6>
                <input
                  value={userInput.name}
                  onChange={e => handleChange("name", e.target.value)}
                  type="text"
                  className="form-control w-50"
                />
              </div>
              <div className="mt-3">
                <h6>Salary amount</h6>
                <input
                  onChange={e => handleChange("amount", e.target.value)}
                  value={userInput.amount}
                  className="form-control w-50"
                  type="number"
                  min="0"
                />
              </div>
              <div className="ml-4 mt-3">
                <Checkbox
                  onChange={v => {
                    setrepeated(v);
                    handleChange("repeated", v);
                  }}
                  props={{
                    id: "repeated",
                    name: "Repeated",
                    value: "Repeated"
                  }}
                />
              </div>
              <div className={repeated ? "" : "d-none"}>
                <span className={`position-absolute ${opened ? "" : "d-none"}`}>
                  <DatePicker
                    calendarClassName="cal"
                    onChange={date => {
                      handleChange("period", date);
                      setOpened(false);
                    }}
                    selected={userInput.period}
                    inline
                  />
                </span>
                <button
                  className="btn border mr-3"
                  onClick={() => setOpened(!opened)}
                >
                  {userInput.period
                    ? new Date(userInput.period).toLocaleDateString("en-US")
                    : "Next payment"}
                </button>
                <div className="mt-3">
                  <h6>Payment step (days)</h6>
                  <input
                    onChange={e => handleChange("step", e.target.value)}
                    value={userInput.step}
                    className="form-control w-50"
                    type="number"
                    min="0"
                  />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button onClick={() => New()} className="btn-success btn">
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
