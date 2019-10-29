import React from "react";

export default function Suppliers() {
	return (
		<div className="table-responsive mt-4">
			<h5>Product suppliers:</h5>
			<table className="table mt-3">
				<thead>
					<tr>
						<th scope="col">Name</th>
						<th scope="col">Company</th>
						<th scope="col">Contact</th>
						<th scope="col">Last Sales Date</th>
						<th scope="col">Last Purchase Price</th>
						<th scope="col">Last Delivery Date</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<th scope="row">1</th>
						<td>Mark</td>
						<td>Otto</td>
						<td>@mdo</td>
						<td>Mark</td>
						<td>Otto</td>
					</tr>
					<tr>
						<th scope="row">2</th>
						<td>Jacob</td>
						<td>Thornton</td>
						<td>@fat</td>
						<td>Mark</td>
						<td>Otto</td>
					</tr>
					<tr>
						<th scope="row">3</th>
						<td>Larry</td>
						<td>the Bird</td>
						<td>@twitter</td>
						<td>Mark</td>
						<td>Otto</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
}
