import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import NewsItem from "./NewsItem";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";

import "./page.css";

function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<Typography
			component="div"
			role="tabpanel"
			hidden={value !== index}
			id={`scrollable-auto-tabpanel-${index}`}
			aria-labelledby={`scrollable-auto-tab-${index}`}
			{...other}
		>
			<Box p={3}>{children}</Box>
		</Typography>
	);
}

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.any.isRequired,
	value: PropTypes.any.isRequired
};

function a11yProps(index) {
	return {
		id: `scrollable-auto-tab-${index}`,
		"aria-controls": `scrollable-auto-tabpanel-${index}`
	};
}

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1,
		width: "100%",
		backgroundColor: theme.palette.background.paper
	}
}));

export default function Sectors() {
	const classes = useStyles();
	const [value, setValue] = React.useState(0);
	const [news, setNews] = React.useState([]);
	const [sectorA, setSectorA] = React.useState([]);
	const [sectorB, setSectorB] = React.useState([]);
	const [sectorC, setSectorC] = React.useState([]);
	React.useEffect(() => {
		fetch("/mix", {
			method: "GET"
		})
			.then(res => res.json())
			.then(res => {
				if (!!res.info) {
					let sectorA = res.info.find(
						item => item.title === "Sector A"
					);
					let sectorB = res.info.find(
						item => item.title === "Sector B"
					);
					let sectorC = res.info.find(
						item => item.title === "Sector C"
					);

					setSectorA(sectorA);
					setSectorB(sectorB);
					setSectorC(sectorC);
				}
			});
		fetch(`/news`)
			.then(res => res.json())
			.then(res => {
				setNews(res.result);
			})
			.catch(error => {
				console.log("Please check your connection..!");
			});
	}, []);
	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<div id="sectors">
			<div className={classes.root}>
				<h3 style={{ textAlign: "center" }}>Sectors</h3>
				<div>
					<AppBar
						position="static"
						style={{
							zIndex: "0",
							color: "#0dc835",
							width: "32%",
							margin: "auto",
							background: "transparent",
							marginTop: "3%",
							boxShadow: "none"
						}}
					>
						<Tabs
							value={value}
							onChange={handleChange}
							indicatorColor="primary"
							textColor="primary"
							variant="scrollable"
							scrollButtons="auto"
							aria-label="scrollable auto tabs example"
							id="textcolor"
						>
							<Tab label="SECTOR A" {...a11yProps(0)} />
							<Tab label="SECTOR B" {...a11yProps(1)} />
							<Tab label="SECTOR C" {...a11yProps(2)} />
							<Tab label="+" {...a11yProps(3)} />
						</Tabs>
					</AppBar>
				</div>
				<TabPanel value={value} index={0}>
					<MDBContainer>
						<MDBRow>
							<MDBCol md={4}>
								{!!sectorA ? (
									<img
										alt=""
										src={`/${sectorA.image}`}
										style={{ width: "100%" }}
									/>
								) : (
									""
								)}
							</MDBCol>
							<MDBCol md={8}>
								<p
									className="mt-2"
									style={{ textAlign: "left" }}
								>
									{!!sectorA ? sectorA.description : ""}
								</p>
							</MDBCol>
						</MDBRow>
						<MDBRow>
							<h4>Sector A News</h4>
						</MDBRow>
					</MDBContainer>

					<div className="team-main">
						<MDBContainer>
							<MDBRow>
								{news
									.filter(item => item.sector === "A")
									.map(item => (
										<MDBCol
											key={item._id}
											md={4}
											style={{ minHeight: "270px" }}
										>
											<NewsItem item={item} />
										</MDBCol>
									))}
							</MDBRow>
						</MDBContainer>
					</div>
				</TabPanel>
				<TabPanel value={value} index={1}>
					<MDBContainer>
						<MDBRow>
							<MDBCol md={4}>
								{!!sectorB ? (
									<img
										alt=""
										src={`/${sectorB.image}`}
										style={{ width: "100%" }}
									/>
								) : (
									""
								)}
							</MDBCol>
							<MDBCol md={8}>
								<p
									className="mt-2"
									style={{ textAlign: "left" }}
								>
									{!!sectorB ? sectorB.description : ""}
								</p>
							</MDBCol>
						</MDBRow>
						<MDBRow>
							<h4>Sector B News</h4>
						</MDBRow>
					</MDBContainer>

					<div className="team-main">
						<MDBContainer>
							<MDBRow>
								{news
									.filter(item => item.sector === "B")
									.map(item => (
										<MDBCol
											key={item._id}
											md={4}
											style={{ minHeight: "270px" }}
										>
											<NewsItem item={item} />
										</MDBCol>
									))}
							</MDBRow>
						</MDBContainer>
					</div>
				</TabPanel>
				<TabPanel value={value} index={2}>
					<MDBContainer>
						<MDBRow>
							<MDBCol md={4}>
								{!!sectorC ? (
									<img
										alt=""
										src={`/${sectorC.image}`}
										style={{ width: "100%" }}
									/>
								) : (
									""
								)}
							</MDBCol>
							<MDBCol md={8}>
								<p
									className="mt-2"
									style={{ textAlign: "left" }}
								>
									{!!sectorC ? sectorC.description : ""}
								</p>
							</MDBCol>
						</MDBRow>
						<MDBRow>
							<h4>Sector C News</h4>
						</MDBRow>
					</MDBContainer>
					<div className="team-main">
						<MDBContainer>
							<MDBRow>
								{news
									.filter(item => item.sector === "C")
									.map(item => (
										<MDBCol
											key={item._id}
											md={4}
											style={{ minHeight: "270px" }}
										>
											<NewsItem item={item} />
										</MDBCol>
									))}
							</MDBRow>
						</MDBContainer>
					</div>
				</TabPanel>
				<TabPanel value={value} index={3}>
					<MDBContainer>
						<MDBRow>
							<MDBCol md={4}>
								{!!sectorC ? (
									<img
										alt=""
										src={`/${sectorC.image}`}
										style={{ width: "100%" }}
									/>
								) : (
									""
								)}
							</MDBCol>
							<MDBCol md={8}>
								<p
									className="mt-2"
									style={{ textAlign: "left" }}
								>
									{!!sectorC ? sectorC.description : ""}
								</p>
							</MDBCol>
						</MDBRow>
						<MDBRow>
							<h4>Sector C News</h4>
						</MDBRow>
					</MDBContainer>
					<div className="team-main">
						<MDBContainer>
							<MDBRow>
								{news
									.filter(item => item.sector === "C")
									.map(item => (
										<MDBCol
											key={item._id}
											md={4}
											style={{ minHeight: "270px" }}
										>
											<NewsItem item={item} />
										</MDBCol>
									))}
							</MDBRow>
						</MDBContainer>
					</div>
				</TabPanel>
			</div>
		</div>
	);
}
