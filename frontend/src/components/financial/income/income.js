import React, { useState, useContext, useEffect } from "react";
import { VictoryPie } from "victory";
import Context from "../../context/context";
import { Params, Request } from "../../../proto/financial/financial_pb";
import Banks from "./banks";
import SendTo from "./send";
import { GetIncome, GetProfile } from "../../../utils/utils";
import { Query } from "../../../proto/products/products_pb";

export default function IncomePage() {
	const context = useContext(Context);
	const client = context.finances;

	const user = GetProfile();

	const [incomes, setIncomes] = useState([]);
	const [data, setData] = useState([]);
	const [banks, setBanks] = useState([]);

	function GetBanks() {
		let params = new Request();

		client.getBanks(params, {}, (err, res) => {
			if (err) {
				console.log(err);
			}

			if (res) {
				setBanks(res.toObject().banksList);
			}
		});
	}

	function GetIncomes() {
		let params = new Params();

		var query = new Query();
		query.setQuerystring(`{"payoffs.supplierid":"${user ? user.id : ""}"}`);

		params.setQuery(query);

		client.getIncome(params, {}, (err, res) => {
			if (err) {
				console.log(err);
			}

			if (res) {
				setIncomes(res.toObject().incomeList);
				console.log(res.toObject().incomeList);
			}
		});
	}

	useEffect(() => {
		GetIncomes();
		GetBanks();
		//eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		let data = [];
		for (var i in incomes) {
			let total = 0;
			console.log(incomes[i]);

			for (var j in incomes[i].payoffsList) {
				total += incomes[i].payoffsList[j].amount;
			}

			data.push({
				x: incomes[i].name,
				y: total - incomes[i].sent
			});
		}
		console.log(data);

		setData(data);
	}, [incomes]);

	if (user) {
		return (
			<div>
				<h4>Income</h4>
				<div className="text-warning font-weight-bold">
					R$ {GetIncome(incomes).toFixed(2)}
				</div>
				<div className="row">
					<div className="col-md-6">
						<div>
							<VictoryPie
								animate={{
									duration: 2000
								}}
								colorScale={"qualitative"}
								padding={80}
								labels={({ datum }) => datum.x + " " + datum.y}
								data={data}
							/>
						</div>
						<SendTo
							GetBanks={() => GetBanks()}
							banks={banks}
							incomes={incomes}
						/>
					</div>
					<div className="col-md-6">
						<Banks GetBanks={() => GetBanks()} banks={banks} />
					</div>
				</div>
			</div>
		);
	}

	return <div></div>;
}
