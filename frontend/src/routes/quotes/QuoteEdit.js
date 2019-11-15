import React from "react";
import Header from "../../components/header/header";
import EditForm from "../../components/quotes/edit/editForm";

function Edit(props) {
  return (
    <div>
      <Header />
      <div className="container shadow p-0">
        <EditForm id={props.id} />
      </div>
    </div>
  );
}

export default Edit;
