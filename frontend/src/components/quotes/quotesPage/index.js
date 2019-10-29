import React, { useEffect, useState, useReducer } from "react";
import { GetParams, QuoteParams } from "../../../proto/quotes/quotes_pb";
import { Query } from "../../../proto/products/products_pb";
import Context from "../../context/context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faEye } from "@fortawesome/free-solid-svg-icons";
import { A } from "hookrouter";
import { getToken, GetProfile } from "../../../utils/utils";

export default function Quotes() {
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
		query.setSortfieldsList(["-id"]);

		var id;
		if (GetProfile().role === "supplier") {
			id = `"supplierids.id":"${GetProfile().id}"`;
		} else {
			id = `"supplierids.id":"${GetProfile().companyid}"`;
		}
		query.setQuerystring(
			`{${id},"$and":[{"timestamp":{"$gte": ${userInput.from.valueOf() /
				1000 -
				86400}}},{"timestamp":{"$lte": ${
				userInput.to !== ""
					? userInput.to.valueOf() / 1000 + 86400
					: new Date().valueOf() / 1000
			}}}]}`
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
		<div className="table-responsive p-4">
			<div className="d-flex justify-content-between">
				<div className="w-50 d-flex ">
					<input
						type="number"
						className="w-50 form-control"
						placeholder="From"
						min={"0"}
						onChange={e => handleChange("from", e.target.value)}
						value={userInput.from}
					/>
					<input
						type="number"
						className="w-50 ml-4 form-control"
						placeholder="To"
						min="0"
						onChange={e => handleChange("to", e.target.value)}
						value={userInput.to}
					/>
				</div>
				<button className="btn-success btn" onClick={() => GetQuotes()}>
					Filter
				</button>
			</div>

			<table className="table mt-4">
				<thead>
					<tr>
						<th scope="col">ID</th>
						<th scope="col">Name</th>
						<th scope="col">Address</th>
						<th scope="col">Phone number</th>
						<th scope="col">Email</th>
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
							<td>
								<A href={`/quote/${quote.id}`}>
									<FontAwesomeIcon icon={faEye} /> View
								</A>
							</td>
							<td>
								<A href={`/edit/quote/${quote.id}`}>
									<FontAwesomeIcon icon={faEdit} /> Edit
								</A>
							</td>
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
	);
}
