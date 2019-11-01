import React, { useEffect, useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsAltH } from "@fortawesome/free-solid-svg-icons";
import { Query } from "../../proto/products/products_pb";
import { GetProfile, TimestampSearch } from "../../utils/utils";
import Context from "../context/context";

export default function ShippingBoard({ from, to }) {
	const context = useContext(Context);

	const [stats, setstats] = useState({});

	const GetStats = () => {
		let query = new Query();

		const timestamp = TimestampSearch(from, to);
		query.setQuerystring(
			`{"supplierids.id":"${GetProfile().id}",${timestamp}}`
		);

		context.quotes.getStatistics(query, {}, (err, res) => {
			if (err) {
				console.log(err);
			} else {
				console.log(res.toObject());
				setstats(res.toObject());
			}
		});
	};

	useEffect(() => {
		GetStats();
		//eslint-disable-next-line
	}, []);

	return (
		<div className="pt-3 d-flex flex-column">
			<h3>
				<span style={{ marginRight: "0.5rem" }}>
					<FontAwesomeIcon icon={faArrowsAltH} />
				</span>
				Order process
			</h3>

			<div className="d-flex flex-row flex-wrap">
				<span className="d-flex flex-column p-3 text-success">
					New
					<span>{stats.pb_new}</span>
				</span>
				<span className="d-flex flex-column p-3">
					Applied
					<span>{stats.applied}</span>
				</span>
				<span className="d-flex flex-column p-3">
					Preparation
					<span>{stats.preparation}</span>
				</span>
				<span className="d-flex flex-column p-3">
					Production
					<span>{stats.production}</span>
				</span>
				{/* <span className="d-flex flex-column p-3">
					Quality
					<span>0</span>
				</span>
				<span className="d-flex flex-column p-3">
					Ready
					<span>0</span>
				</span>
				<span className="d-flex flex-column p-3">
					Picked-up
					<span>0</span>
				</span> */}
				<span className="d-flex flex-column p-3">
					Delivered
					<span>{stats.delivered}</span>
				</span>
				{/* <span className="d-flex flex-column p-3">
					Installed
					<span>0</span>
				</span> */}
				<span className="d-flex flex-column p-3 text-info">
					Completed
					<span>{stats.completed}</span>
				</span>
				<span className="d-flex flex-column p-3 text-danger">
					Cancelled
					<span>{stats.cancelled}</span>
				</span>
			</div>
		</div>
	);
}
