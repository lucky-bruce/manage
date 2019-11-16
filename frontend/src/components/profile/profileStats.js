import React, { useState, useEffect, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClipboardList,
  faWrench,
  faClipboardCheck,
  faPlusSquare,
  faDollarSign
} from "@fortawesome/free-solid-svg-icons";
import Context from "../context/context";
import { Params } from "../../proto/authorization/authorization_pb";
import { Query } from "../../proto/products/products_pb";

export default function Stats({ user }) {
  const context = useContext(Context);
  const client = context.auth;

  const [statts, setStatts] = useState({});

  const GetStats = () => {
    let params = new Params();

    let query = new Query();

    query.setQuerystring(`{"supplierids.id":"${user.id}"}`);
    params.setQuery(query);

    client.getStats(params, {}, (err, res) => {
      if (err) {
        console.log(err);
      } else {
        console.log(res.toObject());
        setStatts(res.toObject());
      }
    });
  };

  useEffect(() => {
    GetStats();
    //eslint-disable-next-line
  }, []);

  return (
    <div className="order-sm- order-2">
      <div className="border p-3">
        <div className="d-flex align-items-center">
          <FontAwesomeIcon
            style={{ fontSize: "25px" }}
            className="mr-3 text-success"
            icon={faClipboardList}
          />
          Price Quatations:{"  "}
          <span className="font-weight-bold">{statts.quotes}</span>
        </div>
        {user.role === "user" ? (
          <div className="mt-4 d-flex align-items-center">
            <FontAwesomeIcon
              style={{ fontSize: "25px" }}
              className="mr-3 text-success"
              icon={faWrench}
            />
            Services Requested:{"  "}
            <span className="font-weight-bold">{statts.services}</span>
          </div>
        ) : (
          ""
        )}

        <div className="mt-4 d-flex align-items-center">
          <FontAwesomeIcon
            style={{ fontSize: "25px" }}
            className="mr-3 text-success"
            icon={faClipboardCheck}
          />
          Completed Orders:{"  "}
          <span className="font-weight-bold">{statts.completed}</span>
        </div>
        {user.role !== "user" ? (
          <div className="mt-4 d-flex align-items-center">
            <FontAwesomeIcon
              style={{ fontSize: "25px" }}
              className="mr-3 text-success"
              icon={faPlusSquare}
            />
            New orders:{"  "}
            <span className="font-weight-bold">{statts.pb_new}</span>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
