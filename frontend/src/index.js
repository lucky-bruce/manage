import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-datepicker/dist/react-datepicker.css";
import "mdbreact/dist/css/mdb.css";
import Dashboard from "./routes/dashboard/Dashboard";
import * as serviceWorker from "./serviceWorker";
import NotFoundPage from "./routes/NotFoundPage";
import { useRoutes } from "hookrouter";
import Provider from "./components/context/provider";
import Main from "./components/main/Components/Layouts/Pages/Main";
import Register from "./routes/accounts/Register";
import Login from "./routes/accounts/Login";
import UserProfile from "./routes/accounts/UserProfile";
import LogOut from "./routes/accounts/LogOut";
import QuoteForm from "./routes/quotes/QuoteForm";
import QuoteEdit from "./routes/quotes/QuoteEdit";
import ProductForm from "./routes/products/ProductForm";
import ProductView from "./routes/products/ProductView";
import Test from "./routes/Test";
import QuoteView from "./routes/quotes/QuoteView";
import FinancialPage from "./routes/dashboard/Financial";
import ProductEdit from "./routes/products/ProductEdit";
import StockPage from "./routes/products/Stock";
import QuotesPage from "./routes/quotes/Quotes";
import NotPermittedPage from "./routes/NotPermitted";
import StaffForm from "./routes/accounts/StaffRegistration";
import { GetClients } from "./clients";
import StatusUpdate from "./routes/quotes/StatusUpdate";
import Private from "./routes/PrivateRoute";
import Settings from "./routes/accounts/Settings";
import Portfolio from "./routes/landing/Dashboard/Editor/Portfolio";
import OurTeam from "./routes/landing/Dashboard/Editor/OurTeam";
import Sectors from "./routes/landing/Dashboard/Editor/Sectors";
import MainDash from "./routes/landing/Dashboard/Editor/Dashboard";
import News from "./routes/landing/Dashboard/Editor/News";
import About from "./routes/landing/Dashboard/Editor/About";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { red, blue } from "@material-ui/core/colors";

require("jquery");
require("bootstrap");
require("dotenv").config();

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

const routes = {
  "/": () => (
    <MuiThemeProvider theme={theme}>
      <Main />
    </MuiThemeProvider>
  ),
  "/not-permitted": () => <NotPermittedPage />,

  "/dashboard": () => (
    <Private roles={["supplier"]}>
      <Dashboard />
    </Private>
  ),
  "/register": () => <Register />,
  "/profile": () => (
    <Private roles={["user", "supplier", "staff"]}>
      <UserProfile />
    </Private>
  ),
  "/new/quote": () => (
    <Private roles={["user"]}>
      <QuoteForm />
    </Private>
  ),
  "/new/product": () => (
    <Private roles={["supplier", "staff"]}>
      <ProductForm />
    </Private>
  ),
  "/new/staff": () => <StaffForm />,
  "/edit/quote/:id": ({ id }) => (
    <Private roles={["supplier", "staff"]}>
      <QuoteEdit id={id} />
    </Private>
  ),
  "/edit/product/:id": ({ id }) => (
    <Private roles={["supplier"]}>
      <ProductEdit id={id} />
    </Private>
  ),
  "/quote/:id": ({ id }) => (
    <Private roles={["user", "supplier", "staff"]}>
      <QuoteView id={id} />
    </Private>
  ),
  "/product/:id": ({ id }) => <ProductView id={id} />,

  "/quote/:id/status-update": ({ id }) => (
    <Private roles={["supplier", "staff"]}>
      <StatusUpdate id={id} />
    </Private>
  ),
  "/financial": () => (
    <Private roles={["supplier"]}>
      <FinancialPage />
    </Private>
  ),
  "/stock": () => (
    <Private roles={["supplier", "user"]}>
      <StockPage />
    </Private>
  ),
  "/quotes": () => <QuotesPage />,
  "/logout": () => <LogOut />,
  "/test": () => <Test />,
  "/login": () => <Login />,
  "/profile/settings": () => (
    <Private roles={["user", "supplier", "staff"]}>
      <Settings />
    </Private>
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

  return routeResult || <NotFoundPage />;
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
serviceWorker.unregister();
