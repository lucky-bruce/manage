import React from "react";
import Img from "../../../../img/index";

export default ({ item }) => (
	<div className="card">
		<Img style={{ maxWidth: "100%" }} alt={item.title} src={item.image} />
		<div className="card-body">
			<div className="card-title">{item.title}</div>
			<div className="card-text">{item.description}</div>
		</div>
	</div>
);
