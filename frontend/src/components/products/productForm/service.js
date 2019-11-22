import React from "react";
import { Radio, Autocomplete } from "../../ui/index";

export default function ServiceForm({ handleChange, userInput }) {
  return (
    <div>
      <div className="mt-5">
        <input
          type="text"
          placeholder="Name"
          value={userInput.name}
          className="form-control col-md-6 mb-4 ml-3"
          onChange={e => handleChange("name", e.target.value)}
        />
        <Autocomplete
          id="sector"
          className="col-md-6 p-0 mb-4 ml-3"
          inputClass="bg-primary text-white product"
          results={["test"]}
          value={userInput.sector}
          onChange={v => handleChange("sector", v)}
          placeholder="Select a Sector"
        />
      </div>
      <div className="mt-5">
        <h5>Paid term</h5>
        <Radio
          props={{
            id: "perday",
            name: "chargetype",
            value: "Per day",
            checked: userInput.chargetype === "Per day",
            onChange: e => handleChange("chargetype", e.target.value)
          }}
        />
        <Radio
          props={{
            id: "perservice",
            name: "chargetype",
            value: "Per service",
            checked: userInput.chargetype === "Per service",
            onChange: e => handleChange("chargetype", e.target.value)
          }}
        />
        <Radio
          props={{
            id: "permonth",
            name: "chargetype",
            value: "Per month",
            checked: userInput.chargetype === "Per month",
            onChange: e => handleChange("chargetype", e.target.value)
          }}
        />
      </div>
      <input
        className="mt-3 ml-3 form-control col-md-6"
        onChange={e => handleChange("chargevalue", e.target.value)}
        type="text"
        placeholder="Price"
      />
    </div>
  );
}
