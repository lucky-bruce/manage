import React, { useState, useEffect, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboard } from "@fortawesome/free-solid-svg-icons";
import { Query } from "../../../proto/products/products_pb";
import { GetProfile } from "../../../utils/utils";
import Context from "../../context/context";

export default function QuotesBoard() {
	const context = useContext(Context);
	const client = context.quotes;

	const [stats, setstats] = useState({});

	function GetStats() {
		let query = new Query();
		query.setQuerystring(`{"supplierids.id":"${GetProfile().id}"}`);

		client.getStatistics(query, {}, (err, res) => {
			if (err) {
				console.log(err);
			} else {
				setstats(res.toObject());
			}
		});
	}

	useEffect(() => {
		GetStats();
		//eslint-disable-next-line
	}, []);

	return (
		<div>
			<h3 className="pt-3 pb-3">
				<span style={{ marginRight: "0.5rem" }}>
					<FontAwesomeIcon icon={faClipboard} />
				</span>
				Quotes
			</h3>
			<div className="d-flex justify-content-between">
				<div className="d-flex flex-column">
					Active
					<span className="text-success font-weight-bold ">
						{stats.active}
					</span>
				</div>
				<div className="d-flex flex-column">
					Pending
					<span className="text-warning font-weight-bold ">
						{stats.pending}
					</span>
				</div>
				<div className="d-flex flex-column">
					Denied
					<span className="text-danger font-weight-bold ">
						{stats.denied}
					</span>
				</div>
			</div>
		</div>
	);
}
