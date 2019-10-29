import React, { useState } from "react";

export const TopBar = props => {
	return (
		<div className="sticky-top">
			<div className="bg-primary p-3 text-white d-flex justify-content-between align-items-center ">
				<span>{props.title}</span>
				<span>{props.funcGroup}</span>
			</div>
		</div>
	);
};

export const Select = props => {
	const [opened, setOpened] = useState(false);
	console.log(opened);

	return (
		<div>
			<div
				className="text-white bg-primary c-select"
				style={{ cursor: "pointer" }}
				onClick={() => setOpened(!opened)}
			>
				Select a service
			</div>
			<div className={`drop position-absolute ${opened ? "" : "d-none"}`}>
				<input
					type="text"
					onChange={e => props.setQuery(e.target.value)}
				/>
				{props.elements.map((elem, i) => (
					<div
						onClick={() => {
							props.onSelect(elem);
							setOpened(false);
						}}
						key={i}
					>
						{elem.name}
					</div>
				))}
			</div>
		</div>
	);
};
