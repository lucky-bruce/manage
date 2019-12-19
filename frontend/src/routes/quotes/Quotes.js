import React from "react";
import Header from "../../components/header/header";
import SearchBar from "../../components/header/search_bar";
import QuotesTable from "../../components/dashboard/table/quotes/quotes";

export default function QuotesPage() {
  return (
    <div className="container-fluid p-0">
      <Header />
      <div className="container p-0 shadow">
        <SearchBar />
        <QuotesTable />
      </div>
    </div>
  );
}
