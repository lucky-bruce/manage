import React from "react";
import { A } from "hookrouter";
import { GetProfile } from "../../../utils/utils";

export default function ProductTable(props) {
	function onQtyChange(i, value) {
		var prds = props.products;

		prds[i].qty = parseInt(value);

		props.onProductChange(prds);
	}

	const onProductChange = (i, prop, value) => {
		var prds = props.products;

		prds[i].product[prop] = parseInt(value);

		props.onProductChange(prds);
	};

	return (
		<div className="mt-3 table-responsive">
			<table className="table">
				<thead className="bg-success text-white">
					<tr>
						<th scope="col">ID</th>
						<th scope="col">Name</th>
						<th scope="col">Qty</th>
						<th scope="col">Size</th>
						<th scope="col">Price</th>

						<th scope="col">Actions</th>
					</tr>
				</thead>
				<tbody>
					{props.products
						? props.products.map((p, i) => {
								console.log(p);

								let dis =
									p.product.userid !== GetProfile().id &&
									p.product.userid !== GetProfile().companyid;

								return (
									<tr key={i}>
										<td>{p.product.id}</td>
										<td>{p.product.name}</td>
										<td width="20%">
											<input
												onChange={e =>
													onQtyChange(
														i,
														e.target.value
													)
												}
												// disabled={
												// 	(GetProfile().role !== "supplier" ||
												// 		GetProfile().role) !==
												// 		"staff" && dis
												// }
												className="custom-input"
												type="number"
												value={p.qty}
											/>
										</td>
										<td>{`${p.product.sizel.toFixed(
											1
										)}x${p.product.sizew.toFixed(
											1
										)}x${p.product.sizeh.toFixed(1)}`}</td>
										<td width="30%">
											<input
												disabled={
													(GetProfile().role !==
														"supplier" ||
														GetProfile().role) !==
														"staff" && dis
												}
												type="number"
												onChange={e => {
													onProductChange(
														i,
														"sellingprice",
														e.target.value
													);
												}}
												className="custom-input disabled"
												value={p.product.sellingprice}
											/>
											R$
										</td>

										<td>
											<A
												href={`/product/${p.product.id}`}
											>
												View
											</A>
										</td>
									</tr>
								);
						  })
						: ""}
				</tbody>
			</table>
		</div>
	);
}
