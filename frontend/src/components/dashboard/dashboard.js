import React, { useState, useReducer } from "react";
import { A } from "hookrouter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsAltH } from "@fortawesome/free-solid-svg-icons";
import FinancialBoard from "./boards/financial";
import StockBoard from "./boards/stock";
import ClientsBoard from "./boards/clients";
import QuotesBoard from "./boards/quotes";
import { GetProfile } from "../../utils/utils";
import DateSelect from "./table/quotes/dateSelect";

export default function Dashboard() {
	const [opened, setOpened] = useState(false);
	const [query] = useState("");
	const user = GetProfile();

	const [userInput, setUserInput] = useReducer(
		(state, newState) => ({ ...state, ...newState }),
		{
			from: "",
			to: new Date()
		}
	);

	const handleChange = (name, value) => {
		setUserInput({ [name]: value });
	};

	if (user) {
		return (
			<div className="p-4 m-3 border-bottom border-top">
				<div className=" d-flex justify-content-between align-items-centers">
					<span>
						<DateSelect
							onFromChange={date => handleChange("from", date)}
							from={userInput.from}
							onToChange={date => handleChange("to", date)}
							to={userInput.to}
						/>
					</span>
					<A
						href="#dash"
						role="button"
						onClick={() => setOpened(!opened)}
					>
						{opened ? "Hide" : "Open card"}
					</A>
				</div>
				<div
					className="dashboard mt-3"
					style={{ display: opened ? "block" : "none" }}
				>
					<div className="row">
						<FinancialBoard
							id={user.id}
							from={userInput.from}
							to={userInput.to}
						/>
						<StockBoard
							id={user.id}
							from={userInput.from}
							to={userInput.to}
						/>
						<div className="col-md-4 p-3  ">
							<ClientsBoard timestamp={query} />
							<QuotesBoard
								id={user.id}
								from={userInput.from}
								to={userInput.to}
							/>
						</div>
					</div>
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
								<span>0</span>
							</span>
							<span className="d-flex flex-column p-3">
								Preparation
								<span>0</span>
							</span>
							<span className="d-flex flex-column p-3">
								Production
								<span>0</span>
							</span>
							<span className="d-flex flex-column p-3">
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
							</span>
							<span className="d-flex flex-column p-3">
								Delivered
								<span>0</span>
							</span>
							<span className="d-flex flex-column p-3">
								Installed
								<span>0</span>
							</span>
							<span className="d-flex flex-column p-3 text-info">
								Completed
								<span>2</span>
							</span>
							<span className="d-flex flex-column p-3 text-danger">
								Cancelled
								<span>1</span>
							</span>
						</div>
					</div>
				</div>
			</div>
		);
	}

	return <div></div>;
}
