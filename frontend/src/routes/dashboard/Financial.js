import React from "react";
import Header from "../../components/header/header";
import Financial from "../../components/financial";

function FinancialPage() {
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
