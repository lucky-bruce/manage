import React, { useEffect } from "react";
import Header from "../../components/header/header";
import View from "../../components/quotes/quoteView";
import { limitedAccess } from "../../utils/utils";

function QuoteView(props) {
	useEffect(() => {
		limitedAccess(["user", "supplier"]);
	}, []);

	return (
		<div className="container-fluid p-0">
			<Header />
			<div className="container mt-3 shadow p-0">
				<View id={props.id} />
			</div>
		</div>
	);
}

export default QuoteView;
