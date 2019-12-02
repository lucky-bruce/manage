import React, { useState, useEffect, useReducer } from "react";
import { getExpense, newExpense, linkSalary } from "../../../../utils/backend";
import { Params } from "../../../../proto/financial/financial_pb";
import DatePicker from "react-datepicker";
import { MDBBtn } from "mdbreact";
import { Params as AuthorizationParams } from "../../../../proto/authorization/authorization_pb";
import {
  GetGRPCExpense,
  expenseInput,
  GetExpenseFromGRPC
} from "../../../../utils/grpc";

export default function SalaryMenu(props) {
  const [opened, setOpened] = useState(false);
  const [from, setfrom] = useState(false);

  const [userInput, setUserInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    expenseInput
  );

  const handleChange = (name, value) => {
    setUserInput({ [name]: value });
  };

  useEffect(() => {
    GetSalary();
  }, [props.salaryid]);

  const GetSalary = () => {
    let p = new Params();
    p.setId(props.salaryid);

    getExpense(p, (err, res) => {
      if (err) {
        // console.log(err);
      } else {
        let e = res.toObject();

        GetExpenseFromGRPC(handleChange, e);
      }
    });
  };

  const NewSalary = () => {
    let s = GetGRPCExpense(userInput);
    s.setName(`${props.name}'s salary`);
    s.setRepeated(true);

    newExpense(s, (err, res) => {
      if (err) {
        console.log(err);
      } else {
        LinkSalary(res.toObject().id);
      }
    });
  };

  const LinkSalary = salaryid => {
    let p = new AuthorizationParams();

    p.setId(props.id);
    p.setSalaryid(salaryid);

    linkSalary(p, (err, res) => {
      if (err) {
        console.log(err);
      } else {
        console.log(res.toObject());
      }
    });
  };

  return (
    <div style={{ maxWidth: "130px" }}>
      <div
        onClick={() => setOpened(!opened)}
        className="border rounded p-3"
        style={{ cursor: "pointer" }}
      >
        Salary control
      </div>
      <div
        className={`position-absolute shadow bg-white p-3 ${
          opened ? "" : "d-none"
        }`}
        style={{ zIndex: "40", maxWidth: "200px", marginLeft: "-5%" }}
      >
        <div>
          <span className={`position-absolute ${from ? "" : "d-none"}`}>
            <DatePicker
              calendarClassName="cal"
              onChange={date => {
                handleChange("period", date);
                setfrom(false);
              }}
              selected={userInput.period}
              inline
            />
          </span>
          <button className="btn border mr-3" onClick={() => setfrom(!from)}>
            {userInput.period
              ? new Date(userInput.period).toLocaleDateString("en-US")
              : "Salary date"}
          </button>
        </div>
        <div>
          <p className="mb-0">Salary amount</p>
          <input
            onChange={e => handleChange("amount", e.target.value)}
            value={userInput.amount}
            className="form-control"
            type="number"
            min="0"
          />
        </div>
        <MDBBtn onClick={() => NewSalary()}>Save</MDBBtn>
      </div>
    </div>
  );
}
