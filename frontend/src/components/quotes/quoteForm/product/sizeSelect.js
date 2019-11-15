import React, { useState } from "react";
import { isEmpty } from "../../../../utils/utils";
export default function SizeSelect(props) {
  const [opened, setOpened] = useState(false);

  const value = () => {
    if (props.value) {
      if (isEmpty(props.value)) {
        return props.name;
      }
      if (!isEmpty(props.value) && props.value.name) {
        return props.value.name;
      }

      return props.value;
    }

    return props.name;
  };

  return (
    <div className={props.className}>
      <div
        className="text-white bg-success c-select"
        style={{ cursor: "pointer" }}
        onClick={() => setOpened(!opened)}
      >
        {value()}
      </div>
      <div
        className={`drop position-absolute no-hover row p-3 ${
          opened ? "" : "d-none"
        }`}
      >
        <div className="col-md-3">
          L:
          <input
            onChange={e => props.onSizeChange("sizel", e)}
            min="0"
            type="number"
            value={props.product ? props.product.sizel : ""}
            className="form-control"
          />
        </div>

        <div className="col-md-3">
          W:
          <input
            onChange={e => props.onSizeChange("sizew", e)}
            min="0"
            type="number"
            value={props.product ? props.product.sizew : ""}
            className="form-control"
          />
        </div>

        <div className="col-md-3">
          H:
          <input
            onChange={e => props.onSizeChange("sizeh", e)}
            min="0"
            type="number"
            value={props.product ? props.product.sizeh : ""}
            className="form-control"
          />
        </div>

        <div className="col-md-3">
          R:
          <input
            onChange={e => props.onSizeChange("sizer", e)}
            min="0"
            type="number"
            value={props.product ? props.product.sizer : ""}
            className="form-control"
          />
        </div>
      </div>
    </div>
  );
}
