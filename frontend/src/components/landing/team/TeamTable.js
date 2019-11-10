import React from "react";
import { MDBTable, MDBTableBody, MDBTableHead } from "mdbreact";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import EditIcon from "@material-ui/icons/Edit";
import { deleteTeam } from "../../../utils/backend";

export default function TeamTable(props) {
	const deleteHandler = name => {
		deleteTeam(name, err => {
			if (err) {
				console.log(err);
			} else {
				props.fetchTeamData();
			}
		});
	};

	const showDeleteConfirm = name => {
		props.confirm({
			title: "Do you Want to delete this item?",
			onOk() {
				deleteHandler(name);
			},
			onCancel() {
				console.log("Cancel", name);
			}
		});
	};

	return (
		<MDBTable style={{ marginTop: "25px" }}>
			<MDBTableHead>
				<tr>
					<th>Image</th>
					<th>Name</th>
					<th>Rating</th>
					<th>Description</th>
					<th>Actions</th>
				</tr>
			</MDBTableHead>
			<MDBTableBody>
				{props.teams.length
					? props.teams.map((item, i) => {
							return (
								<tr key={i}>
									<td>
										<img
											src={`${process.env.REACT_APP_SERVER_LOCAL_IP}:8081/${item.image}`}
											width={50}
											alt=""
										/>
									</td>
									<td>{item.name}</td>
									<td>{item.rating}</td>
									<td>{item.description.substring(0, 35)}</td>
									<td>
										<DeleteForeverIcon
											onClick={() =>
												showDeleteConfirm(item.name)
											}
										/>
										<EditIcon
											onClick={() => props.edit(item._id)}
										/>
									</td>
								</tr>
							);
					  })
					: null}
			</MDBTableBody>
		</MDBTable>
	);
}
