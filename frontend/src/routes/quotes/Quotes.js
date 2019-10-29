import React, { useEffect } from "react";
import Header from "../../components/header/header";
import SearchBar from "../../components/header/search_bar";
import QuotesTable from "../../components/dashboard/table/quotes/quotes";
import { limitedAccess } from "../../utils/utils";

export default function QuotesPage() {
	useEffect(() => {
		limitedAccess(["staff", "supplier"]);
	}, []);
	return (
		<div className="container-fluid p-0">
			<Header />
			<div className="container p-0 shadow">
				<SearchBar />
				<QuotesTable />
			</div>
		</div>
	);
}
