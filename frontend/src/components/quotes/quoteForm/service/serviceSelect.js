import React, { useState, useEffect } from "react";
import { Select } from "../../../ui";
import { getUniqueFields, getServices } from "../../../../utils/backend";

export default function ServiceSelect(props) {
	const [query, setQuery] = useState("");
	const [sectors, setSectors] = useState([]);
	const [sector, setSector] = useState("");
	const [services, setServices] = useState([]);

	const GetSectores = () => {
		getUniqueFields("sector", "services", (err, res) => {
			if (err) {
				console.log(err);
			} else {
				console.log(res.toObject(true));
				setSectors(res.toObject().valuesList);
			}
		});
	};

	const GetServices = () => {
		let q;

		if (query === "" && sector !== "") {
			q = `{"sector":"${sector}"}`;
		} else if (query !== "") {
			q = `{"sector":"${sector}", "$text":{"$search":"${query}"}}`;
		}

		getServices(q, (err, res) => {
			if (err) {
				console.log(err);
			} else {
				console.log(res.toObject());
				setServices(res.toObject().servicesList);
			}
		});
	};

	useEffect(() => {
		GetSectores();
		//eslint-disable-next-line
	}, []);

	useEffect(() => {
		GetServices();
		//eslint-disable-next-line
	}, [query, sector]);

	return (
		<div>
			<select
				onChange={e => setSector(e.target.value)}
				className="custom-select ип-зкшьфкн mt-4"
			>
				<option value="">Select a sector</option>
				{sectors.map((sector, i) => (
					<option>{sector}</option>
				))}
			</select>

			<Select
				className="mt-4"
				name="Select a service"
				setQuery={q => setQuery(q)}
				elements={services.map(service => ({
					name: service.name,
					value: service
				}))}
				value={props.service}
				onSelect={service => props.onServiceSelect(service)}
			/>
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
