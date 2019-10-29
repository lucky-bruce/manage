import React, { useEffect } from "react";
import Header from "../../components/header/header";
import Financial from "../../components/financial";
import { usePath } from "hookrouter";
import { limitedAccess } from "../../utils/utils";

function FinancialPage() {
	const path = usePath();
	useEffect(() => {
		limitedAccess(["supplier"], path);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className="container-fluid p-0">
			<Header />
			<div className="container mt-3 p-0 shadow">
				<Financial />
			</div>
		</div>
	);
}

export default FinancialPage;
