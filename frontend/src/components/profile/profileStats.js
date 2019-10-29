import React, { useState, useEffect, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faClipboardList,
	faWrench,
	faClipboardCheck,
	faPlusSquare,
	faDollarSign
} from "@fortawesome/free-solid-svg-icons";
import Context from "../context/context";
import { Params } from "../../proto/authorization/authorization_pb";

export default function Stats({ user }) {
	const context = useContext(Context);
	const client = context.auth;

	const [statts, setStatts] = useState({});

	const GetStats = () => {
		let params = new Params();
		params.setId(user.id);

		client.getStats(params, {}, (err, res) => {
			if (err) {
				console.log(err);
			} else {
				console.log(res.toObject());
				setStatts(res.toObject());
			}
		});
	};

	useEffect(() => {
		GetStats();
		//eslint-disable-next-line
	}, []);

	return (
		<div className="order-sm- order-2">
			<div className="border p-3">
				<div className="d-flex align-items-center">
					<FontAwesomeIcon
						style={{ fontSize: "25px" }}
						className="mr-3 text-success"
						icon={faClipboardList}
					/>
					Price Quatations:{"  "}
					<span className="font-weight-bold">{statts.quotes}</span>
				</div>
				{user.role === "user" ? (
					<div className="mt-4 d-flex align-items-center">
						<FontAwesomeIcon
							style={{ fontSize: "25px" }}
							className="mr-3 text-success"
							icon={faWrench}
						/>
						Services Requested:{"  "}
						<span className="font-weight-bold">
							{statts.services}
						</span>
					</div>
				) : (
					""
				)}

				<div className="mt-4 d-flex align-items-center">
					<FontAwesomeIcon
						style={{ fontSize: "25px" }}
						className="mr-3 text-success"
						icon={faClipboardCheck}
					/>
					Completed Orders:{"  "}
					<span className="font-weight-bold">{statts.completed}</span>
				</div>
				{user.role !== "user" ? (
					<div className="mt-4 d-flex align-items-center">
						<FontAwesomeIcon
							style={{ fontSize: "25px" }}
							className="mr-3 text-success"
							icon={faPlusSquare}
						/>
						New orders:{"  "}
						<span className="font-weight-bold">
							{statts.pb_new}
						</span>
					</div>
				) : (
					""
				)}
			</div>
			<div className="d-flex mt-3">
				<span>
					<FontAwesomeIcon
						className="text-warning"
						icon={faDollarSign}
					/>
				</span>
				<div
					style={{ marginLeft: "0.3rem" }}
					className="d-flex flex-column"
				>
					<span>
						Total expenses:{" "}
						<span className="text-success font-weight-bold">
							R$ 000.000,000
						</span>
					</span>
					<span>
						Sector 1:{" "}
						<span className="font-weight-bold">R$ 000.000,000</span>
					</span>
					<span>
						Sector 2:{" "}
						<span className="font-weight-bold">R$ 000.000,000</span>
					</span>
					<span>
						Sector 3:{" "}
						<span className="font-weight-bold">R$ 000.000,000</span>
					</span>
				</div>
			</div>
		</div>
	);
}
