import React, { useState, useContext, useEffect } from "react";
import { Button } from "react-bootstrap";
import { A } from "hookrouter";
import { Params } from "../../../proto/services/services_pb";
import { Query } from "../../../proto/products/products_pb";
import Context from "../../context/context";
import { GetProfile } from "../../../utils/utils";

export default function Services(props) {
	const context = useContext(Context);
	const client = context.services;

	const user = GetProfile();
	const [services, setServices] = useState([]);

	const GetServices = () => {
		let params = new Params();

		let query = new Query();
		query.setSortfieldsList(["-id"]);
		query.setQuerystring(
			`{"userid":"${
				user.role === "supplier" ? user.id : user.companyid
			}"}`
		);

		params.setQuery(query);

		client.getServices(params, {}, (err, res) => {
			if (err) {
				console.log(err);
			} else {
				setServices(res.toObject().servicesList);
			}
		});
	};

	useEffect(() => {
		GetServices();

		//eslint-disable-next-line
	}, []);

	return (
		<div>
			<A href="/new/product">
				<Button variant="primary">New service</Button>
			</A>

			<div className="table-responsive mt-3">
				<table className="table ">
					<thead>
						<tr>
							<th scope="col">ID</th>
							<th scope="col">Name</th>
							<th scope="col">CPD</th>
							<th scope="col">CPM</th>
						</tr>
					</thead>
					<tbody>
						{services.map((service, i) => (
							<tr key={i}>
								<th scope="row">{service.id}</th>
								<td>{service.name}</td>
								<td>{service.cpd}</td>
								<td>{service.cpm}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}
