import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers } from "@fortawesome/free-solid-svg-icons";

export default function ClientsBoard() {
	return (
		<div>
			<h3 className="pb-3">
				<span style={{ marginRight: "0.5rem" }}>
					<FontAwesomeIcon icon={faUsers} />
				</span>
				Clients
			</h3>
			<div className="d-flex justify-content-between">
				<div className="d-flex flex-column">
					Active
					<span className="text-success font-weight-bold ">00</span>
				</div>
				<div className="d-flex flex-column">
					Inctive
					<span className="text-danger font-weight-bold ">00</span>
				</div>
			</div>
		</div>
	);
}
