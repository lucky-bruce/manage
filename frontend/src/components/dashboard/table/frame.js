import React, { useState } from "react";
import StaffTable from "./staff";
import StockTable from "./stock";
import QuotesTable from "./quotes/quotes";
import ServicesTable from "./services";

export default function Table() {
	const [active, setActive] = useState({
		title: "Staff",
		component: <StaffTable />,
		active: true
	});

	const list = [
		{
			title: "Staff",
			component: <StaffTable />
		},
		{
			title: "Stock",
			component: <StockTable />
		},
		{
			title: "Quotes",
			component: <QuotesTable />
		},
		{
			title: "Services",
			component: <ServicesTable />
		}
	];

	var nav = [];

	for (var i = 0; i < list.length; i++) {
		let item = list[i];
		nav.push(
			<span
				key={i}
				className={`table-selector ${
					item.title === active.title ? "active" : ""
				}`}
				onClick={() =>
					setActive({ title: item.title, component: item.component })
				}
			>
				{item.title}
			</span>
		);
	}

	return (
		<div className="p-3 dashboard">
			<div className="d-flex p-3 justify-content-between">
				<div>{nav}</div>
			</div>
			{active.component}
		</div>
	);
}
