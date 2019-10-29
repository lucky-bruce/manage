import React, { useState, useEffect } from "react";
import { VictoryPie } from "victory";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { A } from "hookrouter";

import Modal from "./modal";

export default function Banks(props) {
	const [data, setData] = useState([]);
	const [color, setColor] = useState([]);

	function GetData() {
		let data = [];

		for (var i in props.banks) {
			let bank = props.banks[i];

			data.push({ x: i, y: bank.money, label: bank.name });
		}

		setData(data);
	}

	function colorScheme() {
		let scheme = [];
		for (var i in props.banks) {
			scheme.push(props.banks[i].color);
		}

		setColor(scheme);
	}

	useEffect(() => {
		GetData();
		colorScheme();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props.banks]);

	return (
		<div>
			<div>
				<VictoryPie
					animate={{ duration: 2000 }}
					colorScale={color}
					padding={80}
					data={data}
				/>
			</div>
			<div>
				<div className="d-flex flex-row justify-content-between align-items-center mb-3">
					<h6>Income destinations and details</h6>
					<Modal onAdd={() => props.GetBanks()} />
				</div>

				<div className="table-responsive">
					<table className="table">
						<thead className="bg-success text-white">
							<tr>
								<th scope="col">Destinations</th>
								<th scope="col">Funds, R$</th>
								<th scope="col">Actions</th>
							</tr>
						</thead>
						<tbody>
							{props.banks.map((bank, i) => (
								<tr key={i}>
									<th
										scope="row"
										style={{ color: bank.color }}
									>
										{bank.name}
									</th>
									<td>{bank.money.toFixed(3)}</td>
									<td width="20%">
										<A href="/">
											<FontAwesomeIcon icon={faEye} />
										</A>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}
