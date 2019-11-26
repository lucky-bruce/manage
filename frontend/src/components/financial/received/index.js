import React from "react";
import { GetReceived } from "../../financial/utils";
import Modal from "./modal";

export default function Received(props) {
  return (
    <div className="p-4">
      <div className="d-flex align-items-center">
        <h2 className="mr-3">Received</h2>
        <h5 style={{ color: "lightgreen" }}>R$ {GetReceived(props.incomes)}</h5>
      </div>
      <div className="table-responsive ">
        <table className="table mt-5 border-bottom  ">
          <thead
            className="text-white"
            style={{ backgroundColor: "lightgreen" }}
          >
            <tr>
              <th scope="col">Quote ID</th>
              <th scope="col">To be paid</th>
              <th scope="col">Received</th>
              <th scope="col">Time</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {props.incomes
              ? props.incomes.map((income, i) => (
                  <tr key={i}>
                    <th scope="row">{income.quoteid}</th>
                    <td>{income.toreceive}</td>
                    <td>{income.paid}</td>
                    <td>
                      {new Date(income.timestamp * 1000).toLocaleDateString(
                        "en-US"
                      )}
                    </td>
                    <td>
                      <Modal
                        onSubmit={() => props.update()}
                        max={income.toreceive}
                        id={income.quoteid}
                      />
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
