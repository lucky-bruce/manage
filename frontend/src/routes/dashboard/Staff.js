import React from "react";
import Header from "../../components/header/header";
import StaffTable from "../../components/staff/table";

export default function Staff() {
  return (
    <div className="container-fluid p-0">
      <Header />
      <div className="container shadow mt-4">
        <StaffTable />
      </div>
    </div>
  );
}
