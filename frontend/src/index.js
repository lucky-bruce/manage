import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-datepicker/dist/react-datepicker.css";
import "mdbreact/dist/css/mdb.css";
import "./components/main/Components/Layouts/index.css";
import Dashboard from "./routes/dashboard/Dashboard";
import * as serviceWorker from "./serviceWorker";
import NotFoundPage from "./routes/NotFoundPage";
import { useRoutes } from "hookrouter";
import Provider from "./components/context/provider";
import Register from "./routes/accounts/Register";
import Login from "./routes/accounts/Login";
import UserProfile from "./routes/accounts/UserProfile";
import LogOut from "./routes/accounts/LogOut";
import QuoteForm from "./routes/quotes/QuoteForm";
import QuoteEdit from "./routes/quotes/QuoteEdit";
import ProductForm from "./routes/products/ProductForm";
import ProductView from "./routes/products/ProductView";
import Main from "./components/main/Components/Layouts/Pages/Main";
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
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { red, blue } from "@material-ui/core/colors";

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

const routes = {
	"/": () => (
		<MuiThemeProvider theme={theme}>
			<Main />
		</MuiThemeProvider>
	),
	"/not-permitted": () => <NotPermittedPage />,
	"/dashboard": () => <Dashboard />,
	"/register": () => <Register />,
	"/profile": () => <UserProfile />,
	"/new/quote": () => <QuoteForm />,
	"/new/product": () => <ProductForm />,
	"/new/staff": () => <StaffForm />,
	"/edit/quote/:id": ({ id }) => <QuoteEdit id={id} />,
	"/edit/product/:id": ({ id }) => <ProductEdit id={id} />,
	"/quote/:id": ({ id }) => <QuoteView id={id} />,
	"/product/:id": ({ id }) => <ProductView id={id} />,
	"/quote/:id/status-update": ({ id }) => <StatusUpdate id={id} />,
	"/financial": () => <FinancialPage />,
	"/stock": () => <StockPage />,
	"/quotes": () => <QuotesPage />,
	"/logout": () => <LogOut />,
	"/test": () => <Test />,

	"/login": () => <Login />
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
