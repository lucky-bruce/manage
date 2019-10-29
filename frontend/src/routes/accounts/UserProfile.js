import React, { useEffect } from "react";
import Header from "../../components/header/header";
import UserProfile from "../../components/profile/userProfile/profile";
import { GetProfile, limitedAccess } from "../../utils/utils";
import SupplierProfile from "../../components/profile/supplierProfile";
import { usePath } from "hookrouter";

function Profile() {
	const profile = GetProfile();
	const path = usePath();
	useEffect(() => {
		limitedAccess(["user", "supplier", "staff"], path);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (profile) {
		return (
			<div className="container-fluid p-0">
				<Header />
				<div className="container shadow p-0">
					{profile.role === "user" ? (
						<UserProfile />
					) : (
						<SupplierProfile />
					)}
				</div>
			</div>
		);
	}
	return <div></div>;
}

export default Profile;
