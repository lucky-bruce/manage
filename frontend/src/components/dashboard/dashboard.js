import React, { useState, useReducer } from "react";
import { A } from "hookrouter";
import FinancialBoard from "./boards/financial";
import StockBoard from "./boards/stock";
import ClientsBoard from "./boards/clients";
import QuotesBoard from "./boards/quotes";
import { GetProfile } from "../../utils/utils";
import DateSelect from "./table/quotes/dateSelect";
import ShippingBoard from "./shippingboard";

export default function Dashboard() {
  const [opened, setOpened] = useState(false);
  const [query] = useState("");
  const user = GetProfile();

  const [userInput, setUserInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      from: "",
      to: new Date()
    }
  );

  const handleChange = (name, value) => {
    setUserInput({ [name]: value });
  };

  if (
    user &&
    (user.role === "supplier" ||
      user.role === "admin" ||
      (user.role === "staff" && user.permission
        ? user.permission["financial"]
        : false))
  ) {
    return (
      <div className="p-4 m-3 border-bottom ">
        <div className=" d-flex justify-content-between align-items-centers">
          <span>
            <DateSelect
              onFromChange={date => handleChange("from", date)}
              from={userInput.from}
              onToChange={date => handleChange("to", date)}
              to={userInput.to}
            />
          </span>
          <A href="#dash" role="button" onClick={() => setOpened(!opened)}>
            {opened ? "Hide" : "Open card"}
          </A>
        </div>
        <div
          className="dashboard mt-3"
          style={{ display: opened ? "block" : "none" }}
        >
          <div className="row">
            <FinancialBoard
              id={user.id}
              from={userInput.from}
              to={userInput.to}
            />
            <StockBoard id={user.id} from={userInput.from} to={userInput.to} />
            <div className="col-md-4 p-3  ">
              <ClientsBoard timestamp={query} />
              <QuotesBoard
                id={user.id}
                from={userInput.from}
                to={userInput.to}
              />
            </div>
          </div>
          <ShippingBoard from={userInput.from} to={userInput.to} />
        </div>
      </div>
    );
  }

  return <div></div>;
}
