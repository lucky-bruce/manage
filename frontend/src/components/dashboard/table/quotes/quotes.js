import React, { useEffect, useState, useReducer } from "react";
import { QuoteParams } from "../../../../proto/quotes/quotes_pb";
import { Query } from "../../../../proto/products/products_pb";
import Context from "../../../context/context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEye } from "@fortawesome/free-solid-svg-icons";
import { A } from "hookrouter";
import {
  getToken,
  GetProfile,
  GetStatus,
  TimestampSearch
} from "../../../../utils/utils";
import DateSelect from "./dateSelect";

export default function QuotesTable(props) {
  const [quotes, setQuotes] = useState([]);

  const context = React.useContext(Context);
  const client = context.quotes;

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

  function GetQuotes() {
    let query = new Query();
    query.setSortfieldsList(["-timestamp"]);

    var id;
    if (GetProfile().role === "supplier") {
      id = `"supplierids.id":"${GetProfile().id}"`;
    } else {
      id = `"supplierids.id":"${GetProfile().companyid}"`;
    }
    query.setQuerystring(
      `{${id},${TimestampSearch(userInput.from, userInput.to)}}`
    );

    client.getQuotes(query, {}, (err, response) => {
      if (err) {
        console.log(err);
        return [];
      }

      setQuotes(response.toObject().quotesList);
    });
  }

  function DeleteByID(id) {
    let params = new QuoteParams();
    params.setId(id);
    params.setJwt(getToken());

    client.deleteQuote(params, {}, (err, res) => {
      if (err) {
        console.log(err);
      }
      if (res) {
        console.log(res.toObject());
        GetQuotes();
      }
    });
  }

  useEffect(() => {
    GetQuotes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center m-3">
        <div className=" d-flex ">
          <DateSelect
            onFromChange={date => handleChange("from", date)}
            from={userInput.from}
            onToChange={date => handleChange("to", date)}
            to={userInput.to}
          />
        </div>
        <span>
          <button className="btn-success btn" onClick={() => GetQuotes()}>
            Filter
          </button>
        </span>
      </div>
      <div className="table-responsive">
        <table className="table mt-4">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Address</th>
              <th scope="col">Phone number</th>
              <th scope="col">Email</th>
              <th scope="col">Status</th>
              <th scope="col"></th>
              <th scope="col"></th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {quotes.map((quote, i) => (
              <tr key={i}>
                <th scope="row">{quote.id}</th>
                <td>{quote.name}</td>
                <td>{quote.city + ", " + quote.address}</td>
                <td>{quote.phonenumber}</td>
                <td>{quote.email}</td>
                <td>{GetStatus(quote.status)}</td>
                <td>
                  <span>
                    <A className="text-primary" href={`/quote/${quote.id}`}>
                      <FontAwesomeIcon icon={faEye} /> View
                    </A>
                  </span>
                </td>
                {/* <td>
									<A href={`/edit/quote/${quote.id}`}>
										<FontAwesomeIcon icon={faEdit} /> Edit
									</A>
								</td> */}
                <td>
                  <span
                    className="text-primary"
                    style={{ cursor: "pointer" }}
                    onClick={() => DeleteByID(quote.id)}
                  >
                    <FontAwesomeIcon icon={faTrash} /> Delete
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
