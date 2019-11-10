import React from "react";
import { MDBContainer, MDBModal, MDBModalBody, MDBModalHeader } from "mdbreact";
export default ({ item }) => {
	const [modal, toggle] = React.useState(false);
	return (
		<div>
			<MDBContainer style={{ zIndex: "9999" }}>
				<img
					style={{ maxWidth: "100%", height: "200px" }}
					onClick={() => {
						toggle(!modal);
					}}
					alt={item._id}
					src={`${process.env.REACT_APP_SERVER_LOCAL_IP}:8081/${item.image}`}
				/>
				<MDBModal
					isOpen={modal}
					toggle={() => {
						toggle(!modal);
					}}
					size="lg"
				>
					<MDBModalHeader
						toggle={() => {
							toggle(!modal);
						}}
					>
						Sector {item.sector}
					</MDBModalHeader>
					<MDBModalBody>
						<div>
							<img
								style={{ maxWidth: "100%" }}
								alt={item.id}
								src={`${process.env.REACT_APP_SERVER_LOCAL_IP}:8081/${item.image}`}
							/>
							<div>{item.details}</div>
						</div>
					</MDBModalBody>
				</MDBModal>
			</MDBContainer>
		</div>
	);
};
