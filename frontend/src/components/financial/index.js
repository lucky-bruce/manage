import React, { useState } from "react";
import IncomePage from "./income/income";

export default function Financial(props) {
	const tabs = [
		{
			title: "Profits",
			component: ""
		},
		{
			title: "Income",
			component: <IncomePage />
		},
		{
			title: "To receive",
			component: ""
		},
		{
			title: "Expences",
			component: ""
		},
		{
			title: "To be paid",
			component: ""
		}
	];

	const [tab, setTab] = useState(1);

	return (
		<div>
			<div className="sticky-top">
				<div className="bg-primary p-3 text-white d-flex justify-content-between align-items-center ">
					<h2 className="m-0">Financial</h2>
					<span className="d-none d-md-flex">
						{tabs.map((t, i) => (
							<span
								onClick={() => setTab(i)}
								className={`ml-3 tab-link ${
									tab === i ? "active" : ""
								}`}
								key={i}
								style={{ cursor: "pointer" }}
							>
								{t.title}
							</span>
						))}
					</span>
					<select
						className="custom-select w-50 text-white bg-primary d-flex d-md-none"
						onChange={e => {
							setTab(e.target.value);
						}}
						value={tab}
					>
						{tabs.map((t, i) => (
							<option key={i} value={i}>
								{t.title}
							</option>
						))}
					</select>
				</div>
			</div>
			<div className="p-4">
				<div className="mt-4">{tabs[tab].component}</div>
			</div>
		</div>
	);
}
