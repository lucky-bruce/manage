import React, { useContext, useState, useEffect } from "react";
import Context from "../../../context/context";
import { ProductParams, Query } from "../../../../proto/products/products_pb";
import SectorSelect from "./SectorSelect";

export default function ProductSelect(props) {
	const context = useContext(Context);
	const client = context.products;

	const [opened, setOpened] = useState(false);
	const [query, setQuery] = useState("");
	const [products, setProducts] = useState([]);

	function GetProducts() {
		let params = new ProductParams();
		let q = new Query();
		if (query === "" && props.sector !== "") {
			const obj = `{"sector":"${props.sector}"}`;
			q.setQuerystring(obj);
		} else if (query !== "") {
			q.setQuerystring(
				`{"sector":"${props.sector}", "$text":{"$search":"${query}"}}`
			);
		}

		params.setQuery(q);
		client.getProducts(params, {}, (err, res) => {
			if (err) {
				console.log(err);
			}

			if (res) {
				setProducts(res.toObject().productsList);
			}
		});
	}

	useEffect(() => {
		GetProducts();
		//eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props.sector, query]);

	return (
		<div>
			<SectorSelect
				sector={props.sector}
				onSectorChange={v => props.onSectorChange(v)}
			/>
			<div className="mt-4">
				<div
					className="text-white bg-success c-select"
					style={{ cursor: "pointer" }}
					onClick={() => setOpened(!opened)}
				>
					Select a product
				</div>
				<div
					className={`drop position-absolute ${
						opened ? "" : "d-none"
					}`}
				>
					<input
						type="text"
						onChange={e => setQuery(e.target.value)}
					/>
					{products.map((product, i) => (
						<div
							onClick={() => {
								props.onProductSelect(product);
								setOpened(false);
							}}
							value={product.id}
							key={i}
						>
							{product.name}
						</div>
					))}
				</div>
			</div>
			<select
				value={props.size}
				onChange={e => props.onSizeChange(e.target.value)}
				className="custom-select  bg-success text-white mt-4"
			>
				<option>Select sizes</option>
				<option>Approve</option>
				<option>Not Approved</option>
			</select>
			<select className="custom-select  mt-4">
				<option>Select a Optionals</option>
				<option>Approve</option>
				<option>Not Approved</option>
			</select>

			<select className="custom-select  mt-4">
				<option>Finishing type</option>
				<option>Approve</option>
				<option>Not Approved</option>
			</select>
			<div className="mt-4 d-flex justify-content-center">
				<button onClick={() => props.add()} className="btn-success btn">
					Add
				</button>
			</div>
		</div>

		// <select
		// 	className="custom-select  mt-4"
		// 	onChange={e => {
		// 		console.log(e.target.value);

		// 		props.onClick(e.target.value);
		// 	}}
		// >
		// 	<option>Select a Product</option>

		// </select>
	);
}
