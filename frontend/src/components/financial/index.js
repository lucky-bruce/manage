import React, { useState, useEffect, useContext } from "react";
import IncomePage from "./income/income";
import Profit from "./profit/profit";
import Expenses from "./expenses";
import { getIncomes } from "../../utils/backend";
import { Params } from "../../proto/financial/financial_pb";
import { Query } from "../../proto/products/products_pb";
import { GetProfile } from "../../utils/utils";
import ToReceive from "./toreceive";
import Received from "./received";

export default function Financial() {
  const [tab, setTab] = useState(1);

  const [incomes, setIncomes] = useState([]);

  function GetIncomes() {
    let params = new Params();

    var query = new Query();

    // const timestamp = TimestampSearch(from, to);

    query.setQuerystring(`{"supplierid":"${GetProfile().id}"}`);

    params.setQuery(query);

    getIncomes(params, (err, res) => {
      if (err) {
        console.log(err);
      }

      if (res) {
        setIncomes(res.toObject().incomeList);
      }
    });
  }

  useEffect(() => {
    GetIncomes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const tabs = [
    {
      title: "Profits",
      component: <Profit incomes={incomes} />
    },
    {
      title: "Income",
      component: <IncomePage incomes={incomes} />
    },
    {
      title: "To receive",
      component: <ToReceive incomes={incomes} />
    },
    {
      title: "Received",
      component: <Received update={() => GetIncomes()} incomes={incomes} />
    },
    {
      title: "Expenses",
      component: <Expenses incomes={incomes} />
    }
  ];

  return (
    <div>
      <div className="sticky-top">
        <div className="bg-primary p-3 text-white d-flex justify-content-between align-items-center ">
          <h2 className="m-0 text-white">Financial</h2>
          <span className="d-none d-md-flex">
            {tabs.map((t, i) => (
              <span
                onClick={() => setTab(i)}
                className={`ml-3 tab-link ${tab === i ? "active" : ""}`}
                key={i}
                style={{ cursor: "pointer" }}
              >
                {t.title}
              </span>
            ))}
          </span>
          <select
            className="custom-select w-50 text-white bg-primary d-flex d-md-none"
            onChange={e => {
              setTab(e.target.value);
            }}
            value={tab}
          >
            {tabs.map((t, i) => (
              <option key={i} value={i}>
                {t.title}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="p-4">
        <div className="mt-4">{tabs[tab].component}</div>
      </div>
    </div>
  );
}
