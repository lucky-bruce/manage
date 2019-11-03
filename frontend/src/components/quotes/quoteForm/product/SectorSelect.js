import React, { useState, useEffect } from "react";
import { getUniqueFields } from "../../../../utils/backend";

export default function SectorSelect(props) {
	const [sectors, setSectors] = useState([]);
	const GetSectors = () => {
		getUniqueFields("sector", "products", (err, res) => {
			if (err) {
				console.log(err);
			} else {
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
