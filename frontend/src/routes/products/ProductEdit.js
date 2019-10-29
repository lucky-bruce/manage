import React, { useEffect } from "react";
import Header from "../../components/header/header";
import EditForm from "../../components/products/productEdit";
import { limitedAccess } from "../../utils/utils";
import { usePath } from "hookrouter";

function ProductEdit(props) {
	const path = usePath();
	useEffect(() => {
		limitedAccess(["supplier"], path);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className="container-fluid p-0">
			<Header />
			<div className="container p-0 shadow">
				<EditForm id={props.id} />
			</div>
		</div>
	);
}

export default ProductEdit;
