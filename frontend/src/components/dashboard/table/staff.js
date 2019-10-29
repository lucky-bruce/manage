import React, { useState, useEffect, useContext } from "react";
import { Params } from "../../../proto/authorization/authorization_pb";
import { Query } from "../../../proto/products/products_pb";
import { GetProfile } from "../../../utils/utils";
import Context from "../../context/context";

export default function StaffTable() {
	const [users, setUsers] = useState([]);

	const context = useContext(Context);
	const client = context.auth;

	const user = GetProfile();

	useEffect(() => {
		GetUsers();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	function GetUsers() {
		let params = new Params();

		let query = new Query();

		query.setQuerystring(
			`{"companyname":"${user ? user.companyname : ""}"}`
		);

		params.setQuery(query);

		client.getUsers(params, {}, (err, res) => {
			if (err) {
				console.log(err);
			}

			if (res) {
				setUsers(res.toObject().usersList);
			}
		});
	}

	function formatName(f, m, l) {
		if (m !== "") {
			return f + " " + m + " " + l;
		}

		return f + " " + l;
	}

	return (
		<div className="table-responsive">
			<table className="table ">
				<thead>
					<tr>
						<th scope="col">#</th>
						<th scope="col">Name</th>
						<th scope="col">Last</th>
						<th scope="col">Handle</th>
					</tr>
				</thead>
				<tbody>
					{users.map((user, i) => (
						<tr>
							<th scope="row">{i}</th>
							<td>
								{formatName(
									user.firstname,
									user.midname,
									user.lastname
								)}
							</td>
							<td>Otto</td>
							<td>@mdo</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
