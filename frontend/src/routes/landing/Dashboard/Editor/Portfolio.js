import React, { useState, useEffect, useReducer } from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBIcon,
  MDBInput
} from "mdbreact";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import { Modal } from "antd";
import Upload from "./Upload";
import PortfolioTable from "../../../../components/landing/portfolio/PortfolioTable";
import { portfolioInput, GetGRPCPortfolio } from "../../../../utils/grpc";
import Img from "../../../../components/img/index";
import {
  getPortfolios,
  newPortfolio,
  deletePortfolio
} from "../../../../utils/backend";
import { usePath } from "hookrouter";
import { limitedAccess } from "../../../../utils/utils";

const { confirm } = Modal;

const Portfolio = () => {
  const [userInput, setUserInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    portfolioInput
  );

  const handleChange = (name, value) => {
    setUserInput({ [name]: value });
  };

  const path = usePath();

  const [portfolios, setPortfolios] = useState("");

  const [editsector, setEditSector] = useState("");
  const [editdetail, setEditdetail] = useState("");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    fetchPortfolioData();
    limitedAccess(["admin"], path);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submitHandler = e => {
    let portfolio = GetGRPCPortfolio(userInput);

    newPortfolio(portfolio, (err, res) => {
      if (err) {
        console.log(err);
      } else {
        console.log(res.toObject());
        fetchPortfolioData();
      }
    });
  };

  const fetchPortfolioData = () => {
    getPortfolios(null, (err, res) => {
      if (err) {
        console.log(err);
      } else {
        setPortfolios(res.toObject().portfoliosList);
      }
    });
  };

  // const edit = id => {};

  const handleEdit = e => {};

  const deleteHandler = id => {
    deletePortfolio(id, () => {
      fetchPortfolioData();
    });
  };

  // const showDeleteConfirm = id => {};

  return (
    <MDBContainer>
      <p className="h4 text-center mb-4">Portfolio</p>
      <MDBRow>
        <MDBCol md="6">
          <form onSubmit={submitHandler} encType="multipart/form-data">
            <MDBRow>
              <MDBCol md="12">
                <MDBInput
                  label="Details"
                  type="text"
                  value={userInput.details}
                  onChange={e => {
                    handleChange("details", e.target.value);
                  }}
                />
              </MDBCol>
            </MDBRow>

            <MDBRow>
              <MDBCol md="12">
                <MDBInput
                  label="Sectors"
                  type="text"
                  value={userInput.sector}
                  onChange={e => {
                    handleChange("sector", e.target.value);
                  }}
                />
              </MDBCol>
            </MDBRow>
            <MDBRow>
              <MDBCol md="12">
                <Upload setImage={image => handleChange("image", image)} />

                {userInput.image ? (
                  <Img className="img-thumb " src={userInput.image} />
                ) : (
                  ""
                )}
              </MDBCol>
            </MDBRow>

            <div className="text-center mt-4">
              <MDBBtn color="info" outline onClick={() => submitHandler()}>
                Save <MDBIcon far icon="paper-plane" className="ml-2" />
              </MDBBtn>
            </div>
          </form>
        </MDBCol>
        <MDBCol md="6">
          <PortfolioTable
            confirm={confirm}
            deleteHandler={deleteHandler}
            portfolios={portfolios}
          />
        </MDBCol>
      </MDBRow>
      <Modal
        visible={visible}
        title="Edit News"
        onOk={handleEdit}
        onCancel={() => {
          setVisible(!visible);
        }}
      >
        <form encType="multipart/form-data">
          <MDBRow>
            <MDBCol md="12">
              <MDBInput
                label="Detail"
                type="text"
                value={editdetail}
                onChange={e => {
                  let editdetail = e.target.value;
                  setEditdetail(editdetail);
                }}
              />
            </MDBCol>
          </MDBRow>

          <MDBRow style={{ marginTop: "2%" }}>
            <MDBCol md={12}>
              <FormControl style={{ width: "100%", textAlign: "left" }}>
                <InputLabel
                  htmlFor="Sector"
                  style={{ width: "100%", textAlign: "left" }}
                >
                  Sector
                </InputLabel>
                <Select
                  style={{ width: "100%", textAlign: "left" }}
                  value={editsector}
                  onChange={e => {
                    let editsector = e.target.value;
                    setEditSector(editsector);
                  }}
                  inputProps={{
                    name: "Sector",
                    id: "Sector"
                  }}
                >
                  <MenuItem value="A">Sector A</MenuItem>
                  <MenuItem value="B">Sector B</MenuItem>
                  <MenuItem value="C">Sector C</MenuItem>
                </Select>
              </FormControl>
            </MDBCol>
          </MDBRow>
          <MDBRow>
            <MDBCol md="12">
              <Upload />
            </MDBCol>
          </MDBRow>
        </form>
      </Modal>
    </MDBContainer>
  );
};

export default Portfolio;
