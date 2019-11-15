import React from "react";
import Header from "../../components/header/header";
import Setups from "../../components/profile/settings/Settings";

export default function Settings() {
  return (
    <div className="container-fluid p-0">
      <Header />
      <div className="container mt-3 p-0 shadow pb-5">
        <Setups />
      </div>
    </div>
  );
}
