import React, { useState, useEffect, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStoreAlt } from "@fortawesome/free-solid-svg-icons";
import Context from "../../context/context";
import { Params } from "../../../proto/financial/financial_pb";
import { Query } from "../../../proto/products/products_pb";
import { GetSortedIncome } from "../../financial/utils";
import { TimestampSearch } from "../../../utils/utils";

export default function StockBoard(props) {
	const [incomes, setIncomes] = useState([]);

	const context = useContext(Context);
	const client = context.finances;

	function GetIncomes() {
		let params = new Params();
		var query = new Query();

		const timestamp = TimestampSearch(props.from, props.to);
		query.setQuerystring(`{"supplierid":"${props.id}",${timestamp}}`);

		params.setQuery(query);

		client.getIncome(params, {}, (err, res) => {
			if (err) {
				console.log(err);
			}

			if (res) {
				console.log(res.toObject());

				setIncomes(res.toObject().incomeList);
			}
		});
	}

	useEffect(() => {
		GetIncomes();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		GetIncomes();
	}, [props.from, props.to]);

	function GetIncomeBySector(name) {
		let total = 0;
		for (var income of incomes) {
			for (let sector of income.sectorsList) {
				if (sector.name === name) {
					total += sector.amount;
				}
			}
		}

		return total;
	}

	return (
		<div className="col-md-4 p-3 right-border">
			<h3>
				<span style={{ marginRight: "0.5rem" }}>
					<FontAwesomeIcon icon={faStoreAlt} />
				</span>
				Stock
			</h3>
			<div className="d-flex justify-content-between pt-3">
				<div className="d-flex flex-column">
					Total of sectors
					<span className="font-weight-bold">{incomes.length}</span>
				</div>
				<div className="d-flex flex-column">
					Total net worth
					<span className="font-weight-bold text-success">
						R$ 000.000,000
					</span>
				</div>
			</div>
			<div className="d-flex justify-content-between">
				{GetSortedIncome(incomes).map((sector, i) => (
					<div key={i} className="d-flex flex-column pt-5">
						{sector.name} sector
						<span className="font-weight-bold text-warning">
							R$ {GetIncomeBySector(sector.name).toFixed(2)}
						</span>
						{/* <span className="font-weight-bold">Q</span> */}
					</div>
				))}
			</div>
		</div>
	);
}
