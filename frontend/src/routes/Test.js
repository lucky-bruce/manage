import React, { useContext, useEffect } from "react";
import Context from "../components/context/context";
import { GetParams, Query, Any } from "../proto/quotes/quotes_pb";
import { limitedAccess } from "../utils/utils";

export default function Test() {
	const context = useContext(Context);
	const client = context.quotes;

	function GetQuotes() {
		let params = new GetParams();
		let query = new Query();
		query.setKey("id");
		let value = new Any();
		value.setStringvalue("0000001Q");
		query.setValue(value);
		params.addQuery(query);

		client.getQuotes(params, {}, (err, res) => {
			if (err) {
				console.log(err);
			}

			if (res) {
				console.log(res.toObject());
			}
		});
	}

	useEffect(() => {
		limitedAccess([]);
		GetQuotes();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return <div></div>;
}
