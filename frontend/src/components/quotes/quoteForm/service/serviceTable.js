import React from "react";

export default function ServiceTable({ services, onQtyChange }) {
	return (
		<div className="table-responsive">
			<table className="table mt-5 border-bottom table-responsive">
				<thead className="bg-primary text-white">
					<tr>
						<th scope="col">Service type</th>
						<th scope="col">Charge</th>
						<th scope="col">Amount</th>
						<th scope="col">Total</th>
					</tr>
				</thead>
				<tbody>
					{services.map((service, i) => (
						<tr key={i}>
							<th>{service.service.name}</th>
							<td>
								{service.service.chargevalue} R${" "}
								{service.service.chargetype}
							</td>
							<td width="25%">
								<input
									min="1"
									onChange={e =>
										onQtyChange(i, e.target.value)
									}
									type="number"
									className="custom-input"
									value={service.qty}
								/>
							</td>
							<td>
								R$ {service.qty * service.service.chargevalue}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
