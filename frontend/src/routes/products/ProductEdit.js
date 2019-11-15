import React from "react";
import Header from "../../components/header/header";
import EditForm from "../../components/products/productEdit";

function ProductEdit(props) {
  return (
    <div className="container-fluid p-0">
      <Header />
      <div className="container p-0 shadow">
        <EditForm id={props.id} />
      </div>
    </div>
  );
}

export default ProductEdit;
