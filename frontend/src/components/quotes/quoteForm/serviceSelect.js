import React, { useContext, useState, useEffect } from "react";
import Context from "../../context/context";
import { Query } from "../../../proto/products/products_pb";
import { Params } from "../../../proto/services/services_pb";
import { Select } from "../../ui";

export default function ServiceSelect(props) {
	const context = useContext(Context);
	const client = context.services;

	const [query, setQuery] = useState("");
	const [services, setServices] = useState([]);

	const GetServices = () => {
		let params = new Params();

		let q = new Query();
		q.setQuerystring(`{"$text":{"$search":"${query}"}}`);

		params.setQuery(q);

		client.getServices(q, {}, (err, res) => {
			if (err) {
				console.log(err);
			} else {
				console.log();
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
			<div className="mt-4">
				<Select
					setQuery={q => setQuery(q)}
					elements={services}
					onSelect={service => props.setService(service)}
				/>
			</div>
			<select
				value={props.size}
				// onChange={e => props.onSizeChange(e.target.value)}
				className="custom-select  bg-primary text-white mt-4"
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
	);
}
