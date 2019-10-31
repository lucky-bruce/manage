import React, { useState } from "react";
import Autocomplete from "react-autocomplete";

export default function SearchBar() {
	const [query, setquery] = useState("");

	console.log(query);

	return (
		<div className="m-3 pb-3  pt-4">
			<Autocomplete
				wrapperStyle={{ width: "100%" }}
				getItemValue={item => item.label}
				items={[
					{ label: "apple" },
					{ label: "banana" },
					{ label: "pear" }
				]}
				open={false}
				renderInput={props => (
					<input
						className="w-100 p-3"
						placeholder="Search"
						{...props}
					/>
				)}
				renderItem={(item, isHighlighted) => (
					<div
						style={{
							background: isHighlighted ? "lightgray" : "white"
						}}
						className="p-3"
					>
						{item.label}
					</div>
				)}
				value={query}
				onChange={e => setquery(e.target.value)}
				onSelect={val => setquery(val)}
			/>
			{/* <input className="w-100 p-3" placeholder="Search" /> */}
		</div>
	);
}
