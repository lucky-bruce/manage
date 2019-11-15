import React, { useState } from "react";
import { MDBBtn } from "mdbreact";
import { GetProfile } from "../../../utils/utils";
import { changePassword } from "../../../utils/backend";

export default function Settings() {
  const [old, setOld] = useState("");
  const [newPs, setNew] = useState("");
  const [newAgain, setNewAgain] = useState("");

  const [error, seterror] = useState({});

  const check = () => {
    let errored = false;
    let err = {};
    if (old.length < 4) {
      err.old = true;
      errored = true;
    }
    if (newPs.length < 4) {
      err.new = true;
      errored = true;
    }

    if (newAgain.length < 4 || newAgain !== newPs) {
      err.again = true;
      errored = true;
    }

    seterror(err);

    return errored;
  };

  const Change = () => {
    if (check()) {
      return;
    }

    let p = { old, new: newPs, id: GetProfile().id };
    changePassword(p, (err, res) => {
      if (err) {
        console.log(err);
      } else {
        console.log(res.toObject());
      }
    });
  };

  return (
    <div className="p-4">
      <h2>Profile settings</h2>
      <div className="mt-3 col-md-6">
        <h4>Change password</h4>
        <div>
          <input
            type="text"
            onChange={e => setOld(e.target.value)}
            className={`form-control mt-4 ${error.old ? "is-invalid" : ""}`}
            placeholder="Old password"
          />
          <input
            type="text"
            onChange={e => setNew(e.target.value)}
            className={`form-control mt-4 ${error.new ? "is-invalid" : ""}`}
            placeholder="New password"
          />
          <input
            type="text"
            onChange={e => setNewAgain(e.target.value)}
            className={`form-control mt-4 ${error.again ? "is-invalid" : ""}`}
            placeholder="Repeat new password"
          />
        </div>
        <MDBBtn onClick={() => Change()} className="mt-3">
          Change
        </MDBBtn>
      </div>
    </div>
  );
}
