import React, { useState, useReducer, useContext } from "react";
import { TopBar } from "../../ui/index";
import { GetProfile } from "../../../utils/utils";
import Context from "../../context/context";
import { Service } from "../../../proto/services/services_pb";

export default function ServiceForm() {
	const context = useContext(Context);
	const client = context.services;

	const [error] = useState({
		name: false,
		cpd: false,
		cpm: false
	});

	const [userInput, setUserInput] = useReducer(
		(state, newState) => ({ ...state, ...newState }),
		{
			name: "",
			cpd: "",
			cpm: "",
			userid: GetProfile().id
		}
	);

	const handleChange = (name, value) => {
		setUserInput({ [name]: value });
	};

	function submit() {
		let service = new Service();
		service.setName(userInput.name);
		service.setCpd(userInput.cpd);
		service.setCpm(userInput.cpm);
		service.setUserid(userInput.userid);

		client.newService(service, {}, (err, res) => {
			if (err) {
				console.log(err);
			} else {
				console.log(res.toObject());
			}
		});
	}

	return (
		<div>
			<TopBar
				title={"New service"}
				funcGroup={
					<button
						className="btn-success btn"
						onClick={() => submit()}
					>
						Save Quote
					</button>
				}
			/>
			<div className="mt-3 p-4">
				<div className="row">
					<div className="col-md-4">
						<div className="quote-input ">
							<input
								type="text"
								className="form-control"
								placeholder="Service name"
								required
								autoFocus
								value={userInput.name}
								onChange={e => {
									handleChange("name", e.target.value);
								}}
							/>
							<div
								className={`invalid-feedback ${
									error.name ? "d-block" : " "
								} `}
							>
								Please enter a valid name
							</div>
						</div>
						<div className="quote-input ">
							<input
								type="number"
								min="0"
								className="form-control"
								placeholder="Charge per day"
								required
								value={userInput.cpd}
								onChange={e => {
									handleChange("cpd", e.target.value);
								}}
							/>
							<div
								className={`invalid-feedback ${
									error.name ? "d-block" : " "
								} `}
							>
								Please enter a valid name
							</div>
						</div>
					</div>
					<div className="col-md-4">
						<div className="quote-input ">
							<input
								type="number"
								min="0"
								className="form-control"
								placeholder="Charge per month"
								required
								value={userInput.cpm}
								onChange={e => {
									handleChange("cpm", e.target.value);
								}}
							/>
							<div
								className={`invalid-feedback ${
									error.name ? "d-block" : " "
								} `}
							>
								Please enter a valid name
							</div>
						</div>
						<div className="quote-input ">
							<input
								type="text"
								className="form-control"
								placeholder="Charge per day"
								required
								value={userInput.cpd}
								onChange={e => {
									handleChange("cpd", e.target.value);
								}}
							/>
							<div
								className={`invalid-feedback ${
									error.name ? "d-block" : " "
								} `}
							>
								Please enter a valid name
							</div>
						</div>
					</div>
					<div className="col-md-4">
						<div className="quote-input ">
							<input
								type="text"
								className="form-control"
								placeholder="Service name"
								required
								value={userInput.name}
								onChange={e => {
									handleChange("name", e.target.value);
								}}
							/>
							<div
								className={`invalid-feedback ${
									error.name ? "d-block" : " "
								} `}
							>
								Please enter a valid name
							</div>
						</div>
						<div className="quote-input ">
							<input
								type="text"
								className="form-control"
								placeholder="Charge per day"
								required
								value={userInput.cpd}
								onChange={e => {
									handleChange("cpd", e.target.value);
								}}
							/>
							<div
								className={`invalid-feedback ${
									error.name ? "d-block" : " "
								} `}
							>
								Please enter a valid name
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
