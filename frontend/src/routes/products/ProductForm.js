import React from "react";
import Form from "../../components/products/productForm/index";
import Header from "../../components/header/header";

function ProductForm() {
  return (
    <div className="container-fluid p-0 ">
      <Header />
      <div className="container mt-3 p-0 shadow pb-5">
        <Form />
      </div>
    </div>
  );
}

export default ProductForm;
