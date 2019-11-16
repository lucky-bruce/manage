import React, { useState, useEffect, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDollarSign } from "@fortawesome/free-solid-svg-icons";
// import { TimestampSearch, GetProfile } from "../../../utils/utils";
import { getTotalExpense } from "../utils";
import { getExpenses } from "../../../utils/backend";
import ExpensesTable from "./table";

export default function Expenses(props) {
  const [expenses, setExpenses] = useState([]);

  function GetExpenses() {
    var params;
    getExpenses(params, (err, res) => {
      if (err) {
        console.log(err);
      } else {
        setExpenses(res.toObject().expenseList);
      }
    });
  }

  useEffect(() => {
    GetExpenses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    GetExpenses();
    //eslint-disable-next-line
  }, [props.from, props.to]);

  return (
    <div className="p-4">
      <div className="d-flex align-items-center">
        <h2 className="mr-3">Expenses</h2>
        <h5 className="text-warning">R$ {getTotalExpense(expenses)}</h5>
      </div>
      <ExpensesTable expenses={expenses} />
    </div>
  );
}
