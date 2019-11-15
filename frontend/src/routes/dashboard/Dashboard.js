import React, { useEffect } from "react";
import Header from "../../components/header/header";
import SearchBar from "../../components/header/search_bar";
import Dash from "../../components/dashboard/dashboard";
import Table from "../../components/dashboard/table/frame";

function Dashboard() {
  return (
    <div className="container-fluid p-0">
      <Header />
      <div className="container shadow p-0">
        <SearchBar />
        <Dash />
        <Table />
      </div>
    </div>
  );
}

export default Dashboard;
