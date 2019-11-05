import React from "react";
import { A } from "hookrouter";
import { GetProfile } from "../../../utils/utils";

export default function ServiceTable(props) {
	function onQtyChange(i, value) {
		var services = props.services;

		services[i].qty = parseInt(value);

		props.onServiceChange(services);
	}

	const onServiceChange = (i, prop, value) => {
		var services = props.services;

		services[i].service[prop] = parseInt(value);

		props.onServiceChange(services);
	};

	return (
		<div className="mt-3 table-responsive">
			<table className="table">
				<thead className="bg-primary text-white">
					<tr>
						<th scope="col">ID</th>
						<th scope="col">Name</th>
						<th scope="col">Charge</th>
						<th scope="col">Qty</th>
						<th scope="col">Price</th>
						<th scope="col">Actions</th>
					</tr>
				</thead>
				<tbody>
					{props.services
						? props.services.map((s, i) => {
								let dis =
									s.service.userid !== GetProfile().id &&
									s.service.userid !== GetProfile().companyid;

								return (
									<tr key={i}>
										<td>{s.service.id}</td>
										<td>{s.service.name}</td>
										<td>
											{s.service.chargevalue +
												" " +
												s.service.chargetype}
										</td>
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
												value={s.qty}
											/>
										</td>

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
													onServiceChange(
														i,
														"chargevalue",
														e.target.value
													);
												}}
												className="custom-input disabled"
												value={s.service.sellingprice}
											/>
											R$
										</td>

										<td>
											<A
												href={`/product/${s.service.id}`}
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
