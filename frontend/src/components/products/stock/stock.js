import React, { useContext, useEffect, useState } from "react";
import Context from "../../context/context";
import { ProductParams, Query } from "../../../proto/products/products_pb";
import { A } from "hookrouter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faEye } from "@fortawesome/free-solid-svg-icons";
import { getToken, GetProfile } from "../../../utils/utils";

export default function Stock() {
	const context = useContext(Context);
	const client = context.products;

	const [products, setProducts] = useState([]);
	const user = GetProfile();
	function GetProducts() {
		let params = new ProductParams();
		var query = new Query();

		query.setSortfieldsList(["addedtime"]);

		if (user.role !== "user") {
			query.setQuerystring(
				`{"userid":"${
					user.role === "supplier" ? user.id : user.companyid
				}"}`
			);
		}

		params.setQuery(query);

		client.getProducts(params, {}, (err, res) => {
			if (err) {
				console.log(err);
			}

			if (res) {
				setProducts(res.toObject().productsList);
			}
		});
	}

	function DeleteByID(id) {
		let params = new ProductParams();
		params.setId(id);
		params.setJwt(getToken());

		client.deleteProductByID(params, {}, (err, res) => {
			if (err) {
				console.log(err);
			}
			if (res) {
				GetProducts();
			}
		});
	}

	useEffect(() => {
		GetProducts();
		// eslint-disable-next-line
	}, []);

	return (
		<div className="table-responsive p-4">
			{user.role === "supplier" ? (
				<button className="m-3 btn-success btn">
					<A className="text-white" href="/new/product">
						New Product
					</A>
				</button>
			) : (
				""
			)}

			<table className="table ">
				<thead width="100%">
					<tr>
						<th scope="col">ID</th>
						<th scope="col">Name</th>
						<th scope="col">Sector</th>
						<th scope="col">Category</th>
						<th scope="col">Selling price</th>
						<th scope="col">Qty in stock</th>
						<th scope="col"></th>
					</tr>
				</thead>
				<tbody>
					{products.map((product, i) => (
						<tr key={i}>
							<th scope="row">{product.id}</th>
							<td>{product.name}</td>
							<td>{product.sector}</td>
							<td>{product.category}</td>
							<td>{product.sellingprice.toFixed(2)}</td>
							<td>{product.qtyinstock}</td>
							<td>
								<A href={`/product/${product.id}`}>
									<FontAwesomeIcon icon={faEye} /> View
								</A>
							</td>
							{product.userid === user.id ? (
								<td>
									<A href={`/edit/product/${product.id}`}>
										<FontAwesomeIcon icon={faEdit} /> Edit
									</A>
								</td>
							) : (
								""
							)}
							{product.userid === user.id ? (
								<td>
									<span
										className="text-primary"
										style={{ cursor: "pointer" }}
										onClick={() => DeleteByID(product.id)}
									>
										<FontAwesomeIcon icon={faTrash} />{" "}
										Delete
									</span>
								</td>
							) : (
								""
							)}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
