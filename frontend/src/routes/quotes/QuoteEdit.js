import React, { useEffect } from "react";
import Header from "../../components/header/header";
import EditForm from "../../components/quotes/edit/editForm";
import { limitedAccess } from "../../utils/utils";

function Edit(props) {
	useEffect(() => {
		limitedAccess(["supplier"]);
	}, []);
	return (
		<div>
			<Header />
			<div className="container shadow p-0">
				<EditForm id={props.id} />
			</div>
		</div>
	);
}

export default Edit;
