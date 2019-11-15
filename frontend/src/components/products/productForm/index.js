import React, { useState, useContext, useReducer } from "react";

import Context from "../../context/context";
import {
  GetGRPCProduct,
  GetGRPCService,
  productInput
} from "../../../utils/grpc";
import Img from "../../img";
import { navigate } from "hookrouter";
import { TopBar } from "../../ui/index";
import Upload from "../../upload/Upload";
import Product from "./product";
import Service from "./service";

export default function ProductForm() {
  const context = useContext(Context);

  const [tab, settab] = useState(0);

  const [userInput, setUserInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    productInput
  );

  const handleChange = (name, value) => {
    setUserInput({ [name]: value });
  };

  function submit() {
    switch (tab) {
      case 0:
        let prod = GetGRPCProduct(userInput);

        context.products.newProduct(prod, {}, (err, res) => {
          if (err) {
            console.log(err);
          }

          if (res) {
            navigate(`/product/${res.toObject().id}`);
          }
        });
        break;
      case 1:
        let service = GetGRPCService(userInput);
        context.services.newService(service, {}, (err, res) => {
          if (err) {
            console.log(err);
          } else {
            navigate("/dashboard", true);
          }
        });
        break;
      default:
        throw new Error("New error");
    }
  }

  const tabs = [
    <Product handleChange={handleChange} userInput={userInput} />,
    <Service handleChange={handleChange} userInput={userInput} />
  ];

  return (
    <div>
      <TopBar
        title={"New Product"}
        funcGroup={
          <button className="btn-success btn" onClick={() => submit()}>
            Create
          </button>
        }
      />

      <div className="p-4">
        <div className="d-flex justify-content-between">
          <h3>Product and Service Quotation</h3>
        </div>
        <div className="mt-4">
          <div>
            <div className="row">
              <div className="col-md-6">
                <div className="custom-control custom-radio custom-control-inline">
                  <input
                    type="radio"
                    id="product"
                    onChange={() => settab(0)}
                    value="product"
                    checked={tab === 0}
                    name="customRadioInline1"
                    className="custom-control-input"
                  />
                  <label className="custom-control-label" htmlFor="product">
                    Product
                  </label>
                </div>
                <div className="custom-control custom-radio custom-control-inline">
                  <input
                    type="radio"
                    onChange={() => settab(1)}
                    value="service"
                    checked={tab === 1}
                    id="service"
                    name="customRadioInline1"
                    className="custom-control-input"
                  />
                  <label className="custom-control-label" htmlFor="service">
                    Service
                  </label>
                </div>
                <Upload
                  setImage={image =>
                    handleChange("images", [...userInput.images, image])
                  }
                />
              </div>
              <div className="col-md-6">
                {userInput.images.map((image, i) => (
                  <Img
                    key={i}
                    src={image}
                    className="product-form-image img-fluid"
                  />
                ))}
              </div>
            </div>
            {tabs[tab]}
          </div>
        </div>
      </div>
    </div>
  );
}
