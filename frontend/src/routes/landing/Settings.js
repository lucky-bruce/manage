import React from "react";
import { MDBContainer } from "mdbreact";
import { A } from "hookrouter";

export default function Settings() {
  return (
    <MDBContainer>
      <div className="text-center mt-4">
        <p className="h4 text-center mb-4">Website settings</p>
      </div>

      <ul>
        <li>
          <A href="/editor/news">News</A>
        </li>
        <li>
          <A href="/editor/sectors">Sectors</A>
        </li>
        <li>
          <A href="/editor/portfolio">Portfolio</A>
        </li>
        <li>
          <A href="/editor/team">Team</A>
        </li>
        <li>
          <A href="/editor/about">About</A>
        </li>
        <li>
          <A href="/editor/main">Main info</A>
        </li>
      </ul>
      <A href="/profile">Back to profile</A>
    </MDBContainer>
  );
}
