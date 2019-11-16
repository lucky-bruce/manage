import React from "react";
import Context from "./context";

export default function Provider(props) {
	return (
		<Context.Provider value={props.value}>
			{props.children}
		</Context.Provider>
	);
}
