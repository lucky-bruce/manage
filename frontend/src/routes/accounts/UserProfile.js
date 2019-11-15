import React from "react";
import Header from "../../components/header/header";
import UserProfile from "../../components/profile/userProfile/profile";
import { GetProfile } from "../../utils/utils";
import SupplierProfile from "../../components/profile/supplierProfile";

function Profile() {
  const profile = GetProfile();

  if (profile) {
    return (
      <div className="container-fluid p-0">
        <Header />
        <div className="container shadow p-0">
          {profile.role === "user" ? <UserProfile /> : <SupplierProfile />}
        </div>
      </div>
    );
  }
  return <div></div>;
}

export default Profile;
