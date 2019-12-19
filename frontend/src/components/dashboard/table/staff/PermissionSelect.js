import React, { useState } from "react";
import { MDBBtn } from "mdbreact";

export default function PermissionSelect({
  permissions,
  onChange,
  handlePerChange
}) {
  const [opened, setOpened] = useState(false);

  const change = () => {
    handlePerChange();
    setOpened(false);
  };

  return (
    <div style={{ maxWidth: "140px" }}>
      <div
        onClick={() => setOpened(!opened)}
        className="border rounded p-3"
        style={{ cursor: "pointer" }}
      >
        Edit permissions
      </div>
      <div
        className={`position-absolute shadow bg-white p-3 ${
          opened ? "" : "d-none"
        }`}
        style={{ zIndex: "40", minWidth: "140px" }}
      >
        <div className="form-check">
          <input
            onChange={e => onChange("financial", e.target.checked)}
            checked={permissions.financial}
            className="form-check-input"
            type="checkbox"
            value=""
            id="defaultCheck1"
          />
          <label className="form-check-label" for="defaultCheck1">
            Financial
          </label>
        </div>
        <div className="form-check" style={{ marginTop: ".4rem" }}>
          <input
            onChange={e => onChange("stock", e.target.checked)}
            checked={permissions.stock}
            className="form-check-input"
            type="checkbox"
            value=""
            id="defaultCheck1"
          />
          <label className="form-check-label" for="defaultCheck1">
            Products
          </label>
        </div>
        <div className="form-check" style={{ marginTop: ".4rem" }}>
          <input
            onChange={e => onChange("quotes", e.target.checked)}
            checked={permissions.quotes}
            className="form-check-input"
            type="checkbox"
            value=""
            id="defaultCheck1"
          />
          <label className="form-check-label" for="defaultCheck1">
            Quotes
          </label>
        </div>
        <div className="form-check" style={{ marginTop: ".4rem" }}>
          <input
            onChange={e => onChange("services", e.target.checked)}
            checked={permissions.services}
            className="form-check-input"
            type="checkbox"
            value=""
            id="defaultCheck1"
          />
          <label className="form-check-label" for="defaultCheck1">
            Services
          </label>
        </div>

        <MDBBtn onClick={() => change()} size="sm">
          Save
        </MDBBtn>
      </div>
    </div>
  );
}
