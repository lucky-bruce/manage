import React from "react";
import Header from "../../components/header/header";
import View from "../../components/products/productView";

export default function ProductView(props) {
	return (
		<div className="container-fluid p-0">
			<Header />
			<div className="container mt-3 pb-5 p-0 shadow">
				<View id={props.id} />
			</div>
		</div>
	);
}
