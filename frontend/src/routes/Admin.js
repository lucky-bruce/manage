import React from "react";
import Header from "../components/header/header";
import SearchBar from "../components/header/search_bar";

export default function AdminPage() {
	return (
		<div>
			<Header />
			<div className="container p-0 shadow">
				<SearchBar />
			</div>
		</div>
	);
}
