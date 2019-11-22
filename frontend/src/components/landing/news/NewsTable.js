import React from "react";
import { MDBTable, MDBTableBody, MDBTableHead } from "mdbreact";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import EditIcon from "@material-ui/icons/Edit";

export default function NewsTable(props) {
	return (
		<MDBTable style={{ marginTop: "25px" }}>
			<MDBTableHead>
				<tr>
					<th>Image</th>
					<th>Title</th>
					<th>Details</th>
					<th>Sector</th>
					<th>Actions</th>
				</tr>
			</MDBTableHead>
			<MDBTableBody>
				{props.news.length
					? props.news.map((item, i) => {
							return (
								<tr key={i}>
									<td>
										<img
											width={50}
											alt={item.title}
											src={`${process.env.REACT_APP_SERVER_LOCAL_IP}:8081/${item.image}`}
										/>
									</td>
									<td>{item.title}</td>
									<td>{item.description.substring(0, 35)}</td>
									<td>{item.sector}</td>
									<td>
										<DeleteForeverIcon
											onClick={() =>
												props.showDeleteConfirm(
													item.title
												)
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
