import React, { useReducer, useEffect, useContext } from "react";
import { Params } from "../../../proto/financial/financial_pb";
import Context from "../../context/context";

export default function SendTo(props) {
	const context = useContext(Context);
	const client = context.finances;

	const [userInput, setUserInput] = useReducer(
		(state, newState) => ({ ...state, ...newState }),
		{
			name: "",
			amount: 0,
			to: "",
			max: 0
		}
	);

	const handleChange = (name, value) => {
		setUserInput({ [name]: value });
	};

	function submit() {
		let params = new Params();

		params.setName(userInput.name);
		params.setAmount(userInput.amount);
		params.setTo(userInput.to);

		client.toDestination(params, {}, (err, res) => {
			if (err) {
				console.log(err);
			}

			if (res) {
				props.GetBanks();
			}
		});
	}

	useEffect(() => {
		let max = 0;
		for (let income of props.incomes) {
			if (income.name === userInput.name) {
				let t = 0;
				for (let payoff of income.payoffsList) {
					t += payoff.amount;
				}
				max += t - income.sent;
			}
		}

		console.log(max);

		handleChange("max", max);
		//eslint-disable-next-line react-hooks/exhaustive-deps
	}, [userInput.name]);

	return (
		<div className="d-flex flex-column justify-content-center ">
			<h6 className="mx-auto mb-3">Send income to destination</h6>

			<select
				className="custom-select income-input bg-success"
				onChange={e => handleChange("name", e.target.value)}
			>
				<option value="">Select a source from</option>
				{props.incomes.map((income, i) => (
					<option key={i}>{income.name}</option>
				))}
			</select>

			<select
				className="custom-select bg-success income-input"
				onChange={e => handleChange("to", e.target.value)}
			>
				<option value="">Select a destination</option>
				{props.banks.map((bank, i) => (
					<option key={i}>{bank.name}</option>
				))}
			</select>

			<select className="custom-select income-input bg-success">
				<option value="">Select a destination category</option>
				<option>Eletronics</option>
				<option>Not Approved</option>
			</select>

			<select className="custom-select bg-success income-input">
				<option value="">Select a destination sub-category</option>
				<option>Eletronics</option>
				<option>Not Approved</option>
			</select>

			<input
				className="form-control w-75 mt-4 mx-auto"
				type="number"
				value={userInput.amount}
				min="0"
				max={userInput.max}
				onChange={e => {
					console.log(userInput.max);

					if (e.target.value <= userInput.max) {
						handleChange("amount", e.target.value);
					}
				}}
				placeholder="R$"
			/>
			<div className="w-75 mt-4 mx-auto">
				<button
					onClick={() => submit()}
					className="btn btn-success float-right"
				>
					Send
				</button>
			</div>
		</div>
	);
}
