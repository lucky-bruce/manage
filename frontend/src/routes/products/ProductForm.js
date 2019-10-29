import React, { useEffect } from "react";
import Form from "../../components/products/productForm/index";
import Header from "../../components/header/header";
import { limitedAccess } from "../../utils/utils";
import { usePath } from "hookrouter";

function ProductForm() {
	const path = usePath();

	useEffect(() => {
		limitedAccess(["admin", "supplier"], path);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className="container-fluid p-0 ">
			<Header />
			<div className="container mt-3 p-0 shadow pb-5">
				<Form />
			</div>
		</div>
	);
}

export default ProductForm;
