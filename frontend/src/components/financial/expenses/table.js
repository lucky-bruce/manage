import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { Params } from "../../../proto/financial/financial_pb";
import { deleteExpense } from "../../../utils/backend";

export default function ExpensesTable({ expenses, update }) {
  const DeleteExpense = id => {
    let p = new Params();
    p.setId(id);
    deleteExpense(p, (err, res) => {
      if (err) {
        console.log(err);
      } else {
        update();
      }
    });
  };

  return (
    <div className="table-responsive ">
      <table className="table mt-5 border-bottom  ">
        <thead className="bg-warning text-white">
          <tr>
            <th scope="col">Time</th>
            <th scope="col">Description</th>
            <th scope="col">Amount</th>
            <th scope="col">Repeated</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenses
            ? expenses.map((expense, i) => (
                <tr key={i}>
                  <th>
                    {new Date(expense.timestamp * 1000).toLocaleDateString(
                      "en-US"
                    )}
                  </th>
                  <td>{expense.name}</td>
                  <td>{expense.amount}</td>
                  <td>
                    <input
                      checked={expense.repeated}
                      type="checkbox"
                      onChange={() => {}}
                    />
                  </td>
                  <td>
                    <span
                      onClick={() => DeleteExpense(expense.id)}
                      style={{ cursor: "pointer" }}
                    >
                      <FontAwesomeIcon icon={faTimes} />
                    </span>
                  </td>
                </tr>
              ))
            : ""}
        </tbody>
      </table>
    </div>
  );
}
