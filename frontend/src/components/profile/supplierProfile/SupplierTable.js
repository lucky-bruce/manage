import React, { useContext, useState, useEffect } from "react";
import Context from "../../context/context";
import { Query } from "../../../proto/products/products_pb";
import { GetProfile, GetStatus } from "../../../utils/utils";
import { A } from "hookrouter";

export default function SupplierTable(props) {
	const [quotes, setQuotes] = useState([]);

	const profile = GetProfile();

	const context = useContext(Context);
	const client = context.quotes;

	function GetQuotesByUserID() {
		var query = new Query();

		var id;
		if (profile.role === "supplier") {
			id = `"supplierids.id":"${profile.id}"`;
		} else {
			id = `"supplierids.id":"${profile.companyid}"`;
		}
		query.setQuerystring(`${id}}`);

		client.getQuotes(query, {}, (err, res) => {
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
					<thead>
						<tr>
							<th scope="col">ID</th>
							<th scope="col">Name</th>
							<th scope="col">Address</th>
							<th scope="col">Phone number</th>
							<th scope="col">Email</th>
							<th scope="col">Status</th>
							<th scope="col"></th>
						</tr>
					</thead>
					<tbody>
						{quotes.map((quote, i) => (
							<tr key={i}>
								<td>{quote.id}</td>
								<td>
									{quote.productsList.map((product, i) => (
										<div key={i}>
											{product.product.name} x{" "}
											{product.qty}
										</div>
									))}
								</td>
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
