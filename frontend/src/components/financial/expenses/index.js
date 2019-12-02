import React, { useState, useEffect, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDollarSign } from "@fortawesome/free-solid-svg-icons";
// import { TimestampSearch, GetProfile } from "../../../utils/utils";
import { getTotalExpense } from "../utils";
import { getExpenses } from "../../../utils/backend";
import ExpensesTable from "./table";
import { Params } from "../../../proto/financial/financial_pb";
import { Query } from "../../../proto/products/products_pb";
import Modal from "./modal";

export default function Expenses(props) {
  const [expenses, setExpenses] = useState([]);

  function GetExpenses() {
    var params = new Params();
    let q = new Query();
    q.setSortfieldsList(["-timestamp"]);
    params.setQuery(q);

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
      <div className="d-flex align-items-center justify-content-between">
        <span>
          <h2 className="mr-3">Expenses</h2>
          <h5 className="text-warning">R$ {getTotalExpense(expenses)}</h5>
        </span>
        <Modal update={() => GetExpenses()} />
      </div>
      <ExpensesTable update={() => GetExpenses()} expenses={expenses} />
    </div>
  );
}
