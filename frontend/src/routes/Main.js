import React from "react";
import { A } from "hookrouter";

export default function Main() {
	return (
		<div className="d-flex flex-column p-3">
			<A href="/login">Login</A>
			<A href="/register">Register</A>
			<A href="/profile">My profile</A>
			<A href="/dashboard">Dashboard</A>
		</div>
	);
}
