import React, { useEffect } from "react";
import Header from "../../components/header/header";
import View from "../../components/quotes/quoteView";

function QuoteView(props) {
  return (
    <div className="container-fluid p-0">
      <Header />
      <div className="container mt-3 shadow p-0">
        <View id={props.id} />
      </div>
    </div>
  );
}

export default QuoteView;
