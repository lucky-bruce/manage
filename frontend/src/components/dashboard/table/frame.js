import React, { useState, useEffect } from "react";
import StaffTable from "./staff/staff";
import StockTable from "./stock";
import QuotesTable from "./quotes/quotes";
import ServicesTable from "./services";
import { GetProfile } from "../../../utils/utils";

export default function Table() {
  const [active, setActive] = useState(0);

  const u = GetProfile();

  const list = [
    {
      title: "Staff",
      component: <StaffTable />
    },
    {
      title: "Quotes",
      component: <QuotesTable />
    },
    {
      title: "Products",
      component: <StockTable />
    },

    {
      title: "Services",
      component: <ServicesTable />
    }
  ];

  var nav = [];

  for (let i = 0; i < list.length; i++) {
    let item = list[i];
    if (
      (u.role === "staff" && u.permission
        ? u.permission[item.title.toLowerCase()]
        : false) ||
      u.role === "supplier" ||
      u.role === "admin"
    ) {
      nav.push(
        <span
          key={i}
          className={`table-selector ${i === active ? "active" : ""}`}
          onClick={() => setActive(i)}
        >
          {item.title}
        </span>
      );
    }
  }

  useEffect(() => {
    if (nav.length === 0) {
      setActive(-1);
    } else {
      setActive(nav[0].key);
    }
  }, []);

  return (
    <div className="p-3 dashboard">
      <div className="d-flex p-3 justify-content-between">
        <div>{nav}</div>
      </div>
      {list[active]
        ? list[active].component
        : "You don't have an access to this menu. Ask your employeer for permission"}
    </div>
  );
}
