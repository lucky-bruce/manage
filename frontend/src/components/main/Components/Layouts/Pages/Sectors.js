import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import NewsItem from "./NewsItem";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import { getSectors, getNews } from "../../../../../utils/backend";
import Img from "../../../../img/index";

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

  const [sectors, setSectors] = useState([]);
  const [value, setValue] = React.useState(0);
  const [news, setNews] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const GetSectors = () => {
    getSectors((err, res) => {
      if (err) {
        console.log(err);
      } else {
        setSectors(res.toObject().sectorsList);
      }
    });
  };

  const GetNews = () => {
    getNews((err, res) => {
      if (err) {
        console.log(err);
      } else {
        setNews(res.toObject().newsList);
      }
    });
  };

  useEffect(() => {
    GetSectors();
    GetNews();
  }, []);

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
              {sectors.map((sector, i) => (
                <Tab key={i} label={sector.title} {...a11yProps(i)} />
              ))}
            </Tabs>
          </AppBar>
        </div>
        {sectors.map((sector, i) => (
          <TabPanel value={value} key={i} index={i}>
            <MDBContainer>
              <MDBRow>
                <MDBCol md={4}>
                  <Img
                    alt=""
                    src={`/${sector.image}`}
                    style={{ width: "100%" }}
                  />
                </MDBCol>
                <MDBCol md={8}>
                  <p className="mt-2" style={{ textAlign: "left" }}>
                    {sector.description}
                  </p>
                </MDBCol>
              </MDBRow>
              <MDBRow>
                <h4>{sector.title} News</h4>
              </MDBRow>
            </MDBContainer>

            <div className="team-main">
              <MDBContainer>
                <MDBRow>
                  {news
                    .filter(item => item.sector === sector.title)
                    .map((item, i) => (
                      <MDBCol key={i} md={4} style={{ minHeight: "270px" }}>
                        <NewsItem item={item} />
                      </MDBCol>
                    ))}
                </MDBRow>
              </MDBContainer>
            </div>
          </TabPanel>
        ))}
      </div>
    </div>
  );
}
