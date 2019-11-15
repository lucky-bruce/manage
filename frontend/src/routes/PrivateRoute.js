import React from "react";
import { limitedAccess } from "../utils/utils";
import { usePath } from "hookrouter";

export default function PrivateRoute(props) {
  if (limitedAccess(props.roles, usePath())) {
    return props.children;
  }

  return <></>;
}
