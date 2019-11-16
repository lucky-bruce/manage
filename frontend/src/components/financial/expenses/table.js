import React from "react";

export default function ExpensesTable({ expenses }) {
  return (
    <div className="table-responsive ">
      <table className="table mt-5 border-bottom  ">
        <thead className="bg-warning text-white">
          <tr>
            <th scope="col">Time</th>
            <th scope="col">Description</th>
            <th scope="col">Amount</th>
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
                </tr>
              ))
            : ""}
        </tbody>
      </table>
    </div>
  );
}
