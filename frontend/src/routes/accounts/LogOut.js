import React, { useEffect } from "react";

import { isLoggedIn, logOut } from "../../utils/utils";
import { navigate } from "hookrouter";

export default function LogOut() {
	useEffect(() => {
		if (isLoggedIn()) {
			logOut();
		}
		navigate("/", true);
	}, []);

	return <div></div>;
}
