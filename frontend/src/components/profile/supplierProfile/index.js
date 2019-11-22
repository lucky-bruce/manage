import React, { useEffect } from "react";
import { A } from "hookrouter";
import { GetProfile } from "../../../utils/utils";
import SupplierTable from "./SupplierTable";
import $ from "jquery";

import { Button, OverlayTrigger, Popover } from "react-bootstrap";
import Stats from "../profileStats";
import { Tabs } from "../../ui";

export default function SupplierProfile() {
  const userData = GetProfile();

  const copyToClipboard = str => {
    const el = document.createElement("textarea");
    el.value = str;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
  };

  useEffect(() => {
    $(".popover-copy").popover({
      trigger: "focus"
    });
  }, []);

  return (
    <div className="m-3 p-4 ">
      <div className="row">
        <div className="col-md-8">
          <h4>
            Welcome, {userData ? userData.firstName : ""} /{" "}
            {userData.companyname}
          </h4>
        </div>
        <div className="col-md-4 d-flex flex-column"></div>
      </div>
      <div className="d-flex mt-3 mt-md-0 flex-wrap">
        <p className="mr-3">Contact number: {userData.phonenumber}</p>
        <p>Email: {userData.email}</p>
      </div>
      <div className="row mt-4">
        <div className="col-12 col-md-3">
          <img className="w-75 m-auto " src="/images/profile.png" alt="" />
          <div className="mt-4">
            Status: <span className="text-success">Active</span>
          </div>
          <div className="">Last login: dd/mm/yyyy hh:mm:ss</div>
        </div>
        <div className="col-12 col-md-5 d-flex flex-column mt-3 mt-md-0">
          <h6>
            Name: {userData ? userData.firstName + " " + userData.lastName : ""}
          </h6>
          <span>State: {userData.state}</span>
          <span>City: {userData.city}</span>
          {/* <span>Address: {userData.address}</span> */}
        </div>
        <div className="col-12 col-md-4  mt-3 mt-md-0 d-flex flex-column ">
          <div className="d-flex flex-column mb-4 order-1 order-sm-2">
            <A
              href="/new/product"
              className="text-white"
              style={{ marginBottom: "0.2rem" }}
            >
              <button
                type="button"
                className="btn btn-success "
                style={{ whiteSpace: "nowrap" }}
              >
                New product &#43;
              </button>
            </A>

            <OverlayTrigger
              trigger="click"
              placement="bottom"
              overlay={
                <Popover title="Popover bottom">
                  The link was copied to your clipboard
                </Popover>
              }
            >
              <span
                onClick={() =>
                  copyToClipboard(
                    `${window.location.origin}/new/staff?id=${
                      userData
                        ? userData.role === "supplier"
                          ? userData.id
                          : userData.companyid
                        : ""
                    }`
                  )
                }
              >
                <Button variant="info">Get new staff link &#43;</Button>
              </span>
            </OverlayTrigger>
          </div>

          <Stats user={userData} />
        </div>
      </div>
      <div className="mt-4">
        <Tabs data={[{ title: "Quotes", component: <SupplierTable /> }]} />
      </div>
    </div>
  );
}
