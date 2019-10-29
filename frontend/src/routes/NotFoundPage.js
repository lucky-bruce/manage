import React from "react";
import Header from "../components/header/header";
import { A } from "hookrouter";

export default () => {
	return (
		<div>
			<Header />
			<div className="container p-0 shadow">
				<div
					style={{ height: "100%" }}
					className="p-5 text-center align-items-center"
				>
					<h1>404 error. Not found</h1>
					<p>
						<A href="/">Return to main page</A>
					</p>
				</div>
			</div>
		</div>
	);
};
