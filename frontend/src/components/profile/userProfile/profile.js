import React from "react";
import { A } from "hookrouter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { GetProfile } from "../../../utils/utils";
import QuoteTable from "./QuoteTable";
import Stats from "../profileStats";

export default function Profile() {
	const userData = GetProfile();

	return (
		<div className="m-3 p-4 ">
			<div className="d-flex justify-content-between">
				<span>Welcome, {userData ? userData.firstName : ""}</span>
			</div>
			<div className="row mt-4">
				<div className="col-12 col-md-3">
					<img
						className="w-75 m-auto "
						src="/img/profile.png"
						alt=""
					/>
					<div className="mt-4">
						Status: <span className="text-success">Active</span>
					</div>
					<div className="">Last login: dd/mm/yyyy hh:mm:ss</div>
				</div>
				<div className="col-12 col-md-5 d-flex flex-column mt-3 mt-md-0">
					<h6>
						Name:{" "}
						{userData
							? userData.firstName + " " + userData.lastName
							: ""}
					</h6>
					<span>Gender: M</span>
					<span>Reference: </span>
					<span>State: {userData.state}</span>
					<span>City: {userData.city}</span>
					<span>Address: {userData.address}</span>
					<span>Country: {userData.country}</span>
				</div>
				<div className="col-12 col-md-4  mt-3 mt-md-0 d-flex flex-column ">
					<div className="d-flex flex-column mb-4 order-1 order-sm-2">
						<A href="/new/quote" className="text-white mb-3">
							<button type="button" className="btn btn-success">
								New order <FontAwesomeIcon icon={faPlus} />
							</button>
						</A>
						<Stats user={userData} />
					</div>
				</div>
			</div>
			<QuoteTable />
		</div>
	);
}
