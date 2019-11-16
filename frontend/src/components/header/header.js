import React, { useEffect, useState } from "react";
import { A, usePath } from "hookrouter";
import { getBasic } from "../../utils/backend";
import Account from "./account";
import { GetProfile } from "../../utils/utils";

export default () => {
  const [logo, setlogo] = useState("");

  const path = usePath();
  const routes = [
    {
      link: "/dashboard",
      title: "Dashboard",
      access: ["supplier"]
    },
    {
      link: "/financial",
      title: "Financial",
      access: ["supplier"]
    },
    {
      link: "/stock",
      title: "Stock"
    },
    {
      link: "/clients",
      title: "Clients",
      access: ["supplier", "staff"]
    },
    {
      link: "/quotes",
      title: "Quotes",
      access: ["supplier", "staff"]
    },
    {
      link: "/sectors",
      title: "Sectors",
      access: ["supplier", "staff"]
    },
    {
      link: "/statts",
      title: "Statts",
      access: ["supplier", "staff"]
    },
    {
      link: "/providers",
      title: "Providers",
      access: ["user"]
    },
    {
      link: "/logs",
      title: "Logs"
    }
  ];

  var links = [];

  for (var i = 0; i < routes.length; i++) {
    var route = routes[i];
    if (giveAccess(route)) {
      links.push(
        <li key={i} className="nav-item active">
          <A
            className={`nav-link ${route.link === path ? "active" : ""}`}
            href={route.link}
          >
            {route.title}
          </A>
        </li>
      );
    }
  }

  function giveAccess(route) {
    const profile = GetProfile();
    if (profile) {
      if (route.access) {
        for (var i in route.access) {
          if (route.access[i] === profile.role || profile.role === "admin") {
            return true;
          }
        }

        return false;
      }
    }

    return true;
  }

  const GetBasic = () => {
    getBasic((err, res) => {
      if (err) {
        console.log(err);
      } else {
        setlogo(res.toObject().sitename);
      }
    });
  };

  useEffect(() => {
    GetBasic();
    //eslint-disable-next-line
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success text-white ">
      <div className="container">
        <A className="navbar-brand" href="/">
          <h2 className="text-white">{logo}</h2>
        </A>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">{links}</ul>

          <Account />
        </div>
      </div>
    </nav>
  );
};
