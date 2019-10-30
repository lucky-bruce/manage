import React, { useState, useEffect, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDollarSign } from "@fortawesome/free-solid-svg-icons";
import Context from "../../context/context";
import { Params } from "../../../proto/financial/financial_pb";
import {
	GetIncome,
	GetReceived,
	GetToReceive,
	GetProfit
} from "../../financial/utils";
import { Query } from "../../../proto/products/products_pb";

export default function FinancialBoard(props) {
	const [incomes, setIncomes] = useState([]);

	const context = useContext(Context);
	const client = context.finances;

	function GetIncomes() {
		let params = new Params();

		var query = new Query();
		query.setQuerystring(`{"supplierid":"${props.id}"}`);

		params.setQuery(query);

		client.getIncome(params, {}, (err, res) => {
			if (err) {
				console.log(err);
			}

			if (res) {
				setIncomes(res.toObject().incomeList);
			}
		});
	}

	useEffect(() => {
		GetIncomes();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className="col-md-4 p-3 right-border">
			<h3>
				<span
					className="text-warning"
					style={{ marginRight: "0.5rem" }}
				>
					<FontAwesomeIcon icon={faDollarSign} />
				</span>
				Financial
			</h3>
			<div className="row">
				<div className="col-6 d-flex flex-column justify-content-between p-0">
					<div className="d-flex flex-column p-3">
						Income
						<span className="text-primary font-weight-bold">
							R$ {GetIncome(incomes).toFixed(3)}
						</span>
					</div>
					<div className="d-flex flex-column p-3">
						Received
						<span
							style={{ color: "lightgreen" }}
							className="font-weight-bold"
						>
							R$ {GetReceived(incomes).toFixed(3)}
						</span>
					</div>
					<div className="d-flex flex-column p-3">
						To recieve
						<span className="text-black font-weight-bold">
							R$ {GetToReceive(incomes).toFixed(3)}
						</span>
					</div>
				</div>
				<div className="col-6 d-flex flex-column justify-content-between p-0">
					<div className="d-flex flex-column p-3">
						Profit
						<span className="text-success font-weight-bold">
							R$ {GetProfit(incomes).toFixed(3)}
						</span>
					</div>
					<div className="d-flex flex-column p-3">
						Expenses
						<span
							style={{ color: "orange" }}
							className=" font-weight-bold"
						>
							R$ 000.000,000
						</span>
					</div>
					<div className="d-flex flex-column p-3">
						To be paid
						<span className="text-danger font-weight-bold">
							R$ 000.000,000
						</span>
					</div>
				</div>
			</div>
		</div>
	);
}
