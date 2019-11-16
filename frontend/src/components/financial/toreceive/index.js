import React from "react";
import { GetProfit } from "../../financial/utils";

export default function ToReceive(props) {
  return (
    <div className="p-4">
      <div className="d-flex align-items-center">
        <h2 className="mr-3">To receive</h2>
        <h5 className="">R$ {GetProfit(props.incomes)}</h5>
      </div>
      <div className="table-responsive ">
        <table className="table mt-5 border-bottom  ">
          <thead className="  ">
            <tr>
              <th scope="col">Quote ID</th>
              <th scope="col">To receive</th>

              <th scope="col">Time</th>
            </tr>
          </thead>
          <tbody>
            {props.incomes
              ? props.incomes.map((income, i) => (
                  <tr key={i}>
                    <th scope="row">{income.quoteid}</th>
                    <td>{income.toreceive}</td>

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
