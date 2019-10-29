import React from "react";
import { VictoryPie } from "victory";

export default function Chart() {
	return (
		<div className="p-4 chart">
			<VictoryPie
				colorScale={["#65bc64", "#1a9751", "#006838"]}
				padding={100}
				data={[
					{ x: "In price quotation", y: 35 },
					{ x: "Sold and not payed yet", y: 40 },
					{ x: "Sold and payed", y: 55 }
				]}
			/>
		</div>
	);
}
