import React, { useState, useEffect, useContext } from "react";
import Context from "../../../context/context";
import { Params } from "../../../../proto/db/db_pb";

export default function SectorSelect(props) {
	const context = useContext(Context);
	const client = context.db;

	const [sectors, setSectors] = useState([]);
	const GetSectors = () => {
		let params = new Params();
		params.setField("sector");
		params.setCollection("products");

		client.getUnique(params, {}, (err, res) => {
			if (err) {
				console.log(err);
			} else {
				console.log(res.toObject());
				setSectors(res.toObject().valuesList);
			}
		});
	};

	useEffect(() => {
		GetSectors();
		//eslint-disable-next-line
	}, []);

	return (
		<select
			value={props.sector}
			onChange={e => props.onSectorChange(e.target.value)}
			className="custom-select  bg-success text-white mt-4"
		>
			<option value="">Select a sector</option>
			{sectors.map((sector, i) => (
				<option key={i}>{sector}</option>
			))}
		</select>
	);
}
