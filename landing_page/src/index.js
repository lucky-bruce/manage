import React from "react";
import ReactDOM from "react-dom";
import "mdbreact/dist/css/mdb.css";
import "./editor.css";
import "./components/main/Components/Layouts/index.css";
import * as serviceWorker from "./serviceWorker";
import { useRoutes } from "hookrouter";
import Provider from "./components/context/provider";
import About from "./routes/landing/Dashboard/Editor/About";
import Main from "./components/main/Components/Layouts/Pages/Main";

import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { red, blue } from "@material-ui/core/colors";
import Portfolio from "./routes/landing/Dashboard/Editor/Portfolio";
import OurTeam from "./routes/landing/Dashboard/Editor/OurTeam";
import Sectors from "./routes/landing/Dashboard/Editor/Sectors";
import MainDash from "./routes/landing/Dashboard/Editor/Dashboard";
import News from "./routes/landing/Dashboard/Editor/News";
import { GetClients } from "./clients";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: blue[500]
    },
    secondary: red,
    type: "light"
  },
  spacing: 10,
  overrides: {
    shadows: ["none"]
  }
});

require("jquery");
require("bootstrap");
require("dotenv").config();

const routes = {
  "/": () => (
    <MuiThemeProvider theme={theme}>
      <Main />
    </MuiThemeProvider>
  ),

  "/editor/sectors": () => <Sectors />,
  "/editor/portfolio": () => <Portfolio />,
  "/editor/team": () => <OurTeam />,
  "/editor/about": () => <About />,
  "/editor/main": () => <MainDash />,
  "/editor/news": () => <News />
};

const MyApp = () => {
  const routeResult = useRoutes(routes);

  return routeResult;
};

ReactDOM.render(
  <Provider value={GetClients()}>
    <MyApp />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
