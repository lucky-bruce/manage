import React from "react";
import { GetProfit } from "../../financial/utils";

export default function Profit(props) {
  return (
    <div className="p-4">
      <div className="d-flex align-items-center">
        <h2 className="mr-3">Profit</h2>
        <h5 className="text-success">R$ {GetProfit(props.incomes)}</h5>
      </div>
      <div className="table-responsive ">
        <table className="table mt-5 border-bottom  ">
          <thead className="bg-success text-white">
            <tr>
              <th scope="col">Quote ID</th>
              <th scope="col">Profit</th>

              <th scope="col">Time</th>
            </tr>
          </thead>
          <tbody>
            {props.incomes
              ? props.incomes.map((income, i) => (
                  <tr key={i}>
                    <th scope="row">{income.quoteid}</th>
                    <td>
                      {income.toreceive + income.paid - income.profitless}
                    </td>

                    <td>
                      {new Date(income.timestamp * 1000).toLocaleDateString(
                        "en-US"
                      )}
                    </td>
                  </tr>
                ))
              : ""}
          </tbody>
        </table>
      </div>
    </div>
  );
}
