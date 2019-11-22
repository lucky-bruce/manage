import React, { useEffect, useState } from "react";
import { Switch, CheckboxSwitch, Radio, Autocomplete } from "../../ui/index";
import { getUniqueFields } from "../../../utils/backend";

export default function ProductForm({ handleChange, userInput }) {
  const [sectors, setsectors] = useState([]);
  const [categories, setcategories] = useState([]);
  const [subcategories, setsubcategories] = useState([]);

  const GetSectors = () => {
    getUniqueFields("sector", "products", (err, res) => {
      if (err) {
        console.log(err);
      } else {
        setsectors(res.toObject().valuesList);
      }
    });
  };

  const GetCategories = () => {
    getUniqueFields("category", "products", (err, res) => {
      if (err) {
        console.log(err);
      } else {
        setcategories(res.toObject().valuesList);
      }
    });
  };

  const GetSubCategories = () => {
    getUniqueFields("subcategory", "products", (err, res) => {
      if (err) {
        console.log(err);
      } else {
        setsubcategories(res.toObject().valuesList);
      }
    });
  };

  useEffect(() => {
    GetSectors();
    GetCategories();
  }, []);

  return (
    <div>
      <div className="mt-5">
        <h5>Product sold by</h5>
        <div className="custom-control custom-radio custom-control-inline">
          <input
            type="radio"
            onChange={e => handleChange("soldby", e.target.value)}
            value="unit"
            checked={userInput.soldby === "unit"}
            id="unit"
            name="customRadioInline2"
            className="custom-control-input"
          />
          <label className="custom-control-label" htmlFor="unit">
            Unit
          </label>
        </div>
        <div className="custom-control custom-radio custom-control-inline">
          <input
            type="radio"
            id="portion"
            onChange={e => handleChange("soldby", e.target.value)}
            value="portion"
            checked={userInput.soldby === "portion"}
            name="customRadioInline2"
            className="custom-control-input"
          />
          <label className="custom-control-label" htmlFor="portion">
            Portion
          </label>
        </div>

        <div className="custom-control custom-radio custom-control-inline">
          <input
            type="radio"
            onChange={e => {
              handleChange("measurement", e.target.checked);
              handleChange("soldby", "m2");
            }}
            checked={userInput.measurement}
            id="measurement"
            name="customRadioInline2"
            className="custom-control-input"
          />
          <label className="custom-control-label" htmlFor="measurement">
            Measurement
          </label>
          <Switch
            left={
              <span>
                m<sup>2</sup>
              </span>
            }
            leftValue="m2"
            onChange={v => handleChange("soldby", v)}
            right={"normal"}
            className={"ml-3"}
            id="measure-units"
          />
        </div>
      </div>

      <div className="inputs mt-4 col-md-6">
        <div className="quote-input">
          <input
            className="form-control mb"
            placeholder="Product Barcode"
            type="text"
            onChange={e => handleChange("barcode", e.target.value)}
          />
        </div>
        <div className="quote-input">
          <input
            className="form-control mb"
            placeholder="Name"
            type="text"
            onChange={e => handleChange("name", e.target.value)}
          />
        </div>
        <div className="quote-input">
          <input
            className="form-control mb"
            placeholder="Product Buying price"
            type="number"
            onChange={e =>
              handleChange("buyingprice", parseInt(e.target.value))
            }
          />
        </div>
        <div className="quote-input">
          <input
            className="form-control mb"
            placeholder="Product Desired Profit in %"
            type="number"
            onChange={e =>
              handleChange("desiredprofit", parseInt(e.target.value))
            }
          />
        </div>
        <div className="quote-input">
          <input
            className="form-control mb"
            placeholder="Product Discount in %"
            required
            type="number"
            onChange={e => handleChange("discount", parseInt(e.target.value))}
          />
        </div>
      </div>

      <div className="mt-4">
        <h5>Product Portion</h5>

        <div className="mt-3 ml-3 d-flex flex-wrap">
          <CheckboxSwitch
            onCheckboxChange={e => {
              if (e.target.checked) {
                handleChange("portion", "volume");
                handleChange("portionunit", "ml");
              }
            }}
            onSwitchChange={v => handleChange("portionunit", v)}
            switchProps={{
              left: "ml",
              right: "Litres",
              className: "ml-3",
              id: "volume-units"
            }}
            checkboxProps={{
              id: "volume",
              name: "customRadioInline3",
              value: "Volume"
            }}
            active={userInput.portion === "volume"}
          />
          <CheckboxSwitch
            onCheckboxChange={e => {
              if (e.target.checked) {
                handleChange("portion", "weight");
                handleChange("portionunit", "Grams");
              }
            }}
            onSwitchChange={v => handleChange("portionunit", v)}
            switchProps={{
              left: "Grams",
              right: "Kilograms",
              className: "ml-3",
              id: "weight-units"
            }}
            checkboxProps={{
              id: "weight",
              name: "customRadioInline3",
              value: "Weight"
            }}
            active={userInput.portion === "weight"}
          />
        </div>
        <div className="w-50 mt-3 row ml-3">
          <input
            className="col-md-8 form-control mr-5 "
            type="number"
            min="0"
            onChange={e =>
              handleChange("portionvalue", parseInt(e.target.value))
            }
          />
        </div>
      </div>

      <div className="mt-4">
        <h5>Product Measurement</h5>
        <div className="mt-3">
          <Radio
            props={{
              id: "cm",
              name: "customRadioInline4",
              value: "cm",
              checked: userInput.measurementunit === "cm",
              onChange: e => handleChange("measurementunit", e.target.value)
            }}
          />
          <Radio
            props={{
              id: "meters",
              name: "customRadioInline4",
              value: "meters",
              checked: userInput.measurementunit === "meters",
              onChange: e => handleChange("measurementunit", e.target.value)
            }}
          />
        </div>

        <div className="mt-3 row">
          <div className="quote-input col-md-3 col-6">
            <input
              className="form-control mb"
              placeholder="Length"
              required
              type="number"
              onChange={e => handleChange("sizel", parseInt(e.target.value))}
            />
          </div>
          <div className="quote-input col-md-3 col-6">
            <input
              className="form-control mb"
              placeholder="Width"
              required
              type="number"
              onChange={e => handleChange("sizew", parseInt(e.target.value))}
            />
          </div>
          <div className="quote-input col-md-3 col-6">
            <input
              className="form-control mb"
              placeholder="Height"
              required
              type="number"
              onChange={e => handleChange("sizeh", parseInt(e.target.value))}
            />
          </div>
          <div className="quote-input col-md-3 col-6">
            <input
              className="form-control mb"
              placeholder="Diameter"
              required
              type="number"
              onChange={e => handleChange("sized", parseInt(e.target.value))}
            />
          </div>
        </div>
      </div>
      <div className="mt-3">
        <h5>Stock</h5>
        <div className="quote-input mt-3 col-md-3 col-6">
          <input
            className="form-control mb"
            placeholder="Qty in stock"
            required
            type="number"
            onChange={e => handleChange("qtyinstock", parseInt(e.target.value))}
          />
        </div>
        <div className="quote-input col-md-3 col-6">
          <input
            className="form-control mb"
            placeholder="Min qty"
            required
            type="number"
            onChange={e =>
              handleChange("minqtyinstock", parseInt(e.target.value))
            }
          />
        </div>
      </div>

      <div className="mt-3">
        <Autocomplete
          id="sector"
          className="col-md-6 p-0 mb-4"
          inputClass="bg-primary text-white product"
          results={sectors}
          value={userInput.sector}
          onChange={v => handleChange("sector", v)}
          placeholder="Select a Sector"
        />
        <Autocomplete
          id="category"
          className="col-md-6 p-0 mb-4"
          inputClass="bg-primary text-white product"
          results={categories}
          value={userInput.category}
          onChange={v => handleChange("category", v)}
          placeholder="Select a Category"
        />
        <Autocomplete
          className="col-md-6 p-0 mb-4"
          inputClass="bg-primary text-white product"
          results={subcategories}
          value={userInput.subcategory}
          onChange={v => handleChange("subcategory", v)}
          placeholder="Select a Sub Category"
        />
        <Autocomplete
          className="col-md-6 p-0 mb-4"
          inputClass="bg-primary text-white product"
          results={["test"]}
          value={userInput.brand}
          onChange={v => handleChange("brand", v)}
          placeholder="Select a Brand"
        />
        <Autocomplete
          className="col-md-6 p-0 mb-4"
          inputClass="bg-primary text-white product"
          results={["test"]}
          value={userInput.brandmodel}
          onChange={v => handleChange("brandmodel", v)}
          placeholder="Select a Brand Model"
        />
      </div>
      <div className="mt-0 w-100">
        <textarea
          placeholder="Description"
          className="form-control "
          rows="5"
          onChange={e => handleChange("description", e.target.value)}
        ></textarea>
      </div>
    </div>
  );
}
