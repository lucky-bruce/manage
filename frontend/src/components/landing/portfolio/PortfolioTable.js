import React from "react";
import {
	MDBContainer,
	MDBRow,
	MDBCol,
	MDBBtn,
	MDBIcon,
	MDBInput,
	MDBTable,
	MDBTableBody,
	MDBTableHead
} from "mdbreact";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import EditIcon from "@material-ui/icons/Edit";

export default function PortfolioTable(props) {
	const edit = id => {
		// let editableArrary = portfolios.filter(item => item._id === id);
		// const [editable = {}] = editableArrary;
		// const { _id = "", detail = "", sector = "", image = "" } = editable;
		// setId(_id);
		// setEditSector(sector);
		// setDefaultImage(image);
		// setEditdetail(detail);
		// setVisible(!visible);
	};

	const showDeleteConfirm = id => {
		props.confirm({
			title: "Do you Want to delete this item?",
			onOk() {
				props.deleteHandler(id);
			},
			onCancel() {
				console.log("Cancel", id);
			}
		});
	};

	return (
		<MDBTable style={{ marginTop: "25px" }}>
			<MDBTableHead>
				<tr>
					<th>Image</th>
					<th>Details</th>
					<th>Sector</th>
					<th>Actions</th>
				</tr>
			</MDBTableHead>
			<MDBTableBody>
				{props.portfolios.length
					? props.portfolios.map((item, i) => {
							return (
								<tr key={i}>
									<td>
										<img
											src={`${process.env.REACT_APP_SERVER_LOCAL_IP}:8081/${item.image}`}
											width={50}
											alt=""
										/>
									</td>
									<td>{item.details.substring(0, 35)}</td>
									<td>{item.sector}</td>
									<td>
										<DeleteForeverIcon
											onClick={() =>
												showDeleteConfirm(item.id)
											}
										/>
										<EditIcon
											onClick={() => edit(item.id)}
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
