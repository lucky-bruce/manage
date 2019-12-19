import React, { useState, useContext, useEffect } from "react";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Context from "../../context/context";
import { ProductParams } from "../../../proto/products/products_pb";
import ImgCarousel from "./imgCarousel";

import Suppliers from "./table";
import Reviews from "./reviews/reviews";

export default function View(props) {
  const [product, setProduct] = useState({});

  const context = useContext(Context);
  const client = context.products;

  function GetProductByID() {
    let params = new ProductParams();
    params.setId(props.id);

    client.getProductByID(params, {}, (err, res) => {
      if (err) {
        console.log(err);
      }

      if (res) {
        setProduct(res.toObject());
      }
    });
  }

  useEffect(() => {
    GetProductByID();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <div className="sticky-top">
        <div className="bg-primary p-3 text-white d-flex justify-content-between align-items-center ">
          <span>
            <FontAwesomeIcon icon={faTimes} /> Product View
          </span>
        </div>
      </div>
      <div className="p-4">
        <div className="row">
          <div className="col-md-4">
            <h4>{product.name}</h4>

            <p>{product.sector}</p>
            <ImgCarousel imgs={product.imagesList || []} />
          </div>
          <div className="col-md-4 ">
            <h5>Total in stock: {product.qtyinstock}</h5>

            <div className="font-weight-bold">Product description:</div>
            <p>{product.description}</p>
            <div>
              Product unit price: R${" "}
              {product.sellingprice ? product.sellingprice.toFixed(2) : "0.0"}
            </div>
          </div>
          <div className="col-md-4 p-0">{/* <Chart /> */}</div>
        </div>
        <Reviews id={product.id} />

        <Suppliers />
      </div>
    </div>
  );
}
