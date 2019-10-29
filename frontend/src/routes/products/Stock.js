import React from "react";
import Header from "../../components/header/header";
import SearchBar from "../../components/header/search_bar";
import Stock from "../../components/products/stock/stock";

export default function StockPage() {
	return (
		<div className="container-fluid p-0">
			<Header />
			<div className="container p-0 shadow">
				<SearchBar />
				<Stock />
			</div>
		</div>
	);
}
