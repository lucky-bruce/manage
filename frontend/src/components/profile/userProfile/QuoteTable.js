import React, { useContext, useState, useEffect } from "react";
import Context from "../../context/context";

import { Query } from "../../../proto/products/products_pb";
import { GetProfile, GetStatus } from "../../../utils/utils";
import { A } from "hookrouter";

export default function QuoteTable() {
	const [quotes, setQuotes] = useState([]);
	const context = useContext(Context);
	const client = context.quotes;

	function GetQuotesByUserID() {
		const profile = GetProfile();

		var q = new Query();
		q.setSortfieldsList(["-timestamp"]);
		q.setQuerystring(`{"userid":"${profile.id}"}`);

		client.getQuotes(q, {}, (err, res) => {
			if (err) {
				console.log(err);
			}

			if (res) {
				setQuotes(res.toObject().quotesList);
			}
		});
	}

	useEffect(() => {
		GetQuotesByUserID();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className="mt-5">
			<h3>Validate quotations</h3>
			<div className="mt-3 table-responsive">
				<table className="table">
					<thead className="bg-success text-white">
						<tr>
							<th scope="col">ID</th>
							<th scope="col">Name</th>
							<th scope="col">Address</th>
							<th scope="col">Phone number</th>
							<th scope="col">Email</th>{" "}
							<th scope="col">Status</th>
							<th scope="col"></th>
						</tr>
					</thead>
					<tbody>
						{quotes.map((quote, i) => (
							<tr key={i}>
								<td>{quote.id}</td>
								<td>{quote.name}</td>
								<td>{quote.city + ", " + quote.address}</td>
								<td>{quote.phonenumber}</td>
								<td>{quote.email}</td>
								<td>{GetStatus(quote.status)}</td>
								<td>
									<A href={`/quote/${quote.id}`}>View</A>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}
