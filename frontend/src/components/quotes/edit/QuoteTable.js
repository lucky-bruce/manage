import React from "react";
import { A } from "hookrouter";

export default function QuoteTable(props) {
	return (
		<div className="table-responsive">
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
					{props.products.map((p, i) => (
						<tr key={i}>
							<td>{p.product.id}</td>
							<td>{p.product.name}</td>
							<td width="10%">
								<input
									className="custom-input"
									onChange={e =>
										props.onQtyChange(i, e.target.value)
									}
									value={p.qty}
								/>
							</td>
							<td>{`${p.product.sizel.toFixed(
								1
							)}x${p.product.sizew.toFixed(
								1
							)}x${p.product.sizeh.toFixed(1)}`}</td>
							<td width="25%">
								<input
									readOnly={props.user.role !== "supplier"}
									className="custom-input"
									value={p.product.sellingprice}
								/>
								R$
							</td>

							<td>
								<A href={`/product/${p.product.id}`}>View</A>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
