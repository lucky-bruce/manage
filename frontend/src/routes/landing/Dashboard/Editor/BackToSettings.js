import React from "react";
import { A } from "hookrouter";

export default function BackToSettings(props) {
  return (
    <div className="d-flex justify-content-between align-items-center">
      <A href="/editor">Back to settings</A>
      {props.children}
      <span style={{ width: "90px" }}></span>
    </div>
  );
}
