import React, { useEffect, useReducer } from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBIcon,
  MDBInput
} from "mdbreact";
import {
  basicInput,
  getBasicFromGRPC,
  getGRPCBasic
} from "../../../../utils/grpc";
import { getBasic, newBasic } from "../../../../utils/backend";
import { navigate, usePath } from "hookrouter";
import BackToSettings from "./BackToSettings";
import { limitedAccess } from "../../../../utils/utils";

const FormPage = () => {
  const [userInput, setUserInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    basicInput
  );

  const handleChange = (name, value) => {
    setUserInput({ [name]: value });
  };

  const handleSubmit = () => {
    let b = getGRPCBasic(userInput);

    newBasic(b, (err, res) => {
      if (err) {
        console.log(err);
      } else {
        navigate("/");
      }
    });
  };

  const GetBasic = () => {
    getBasic((err, res) => {
      if (err) {
        console.log(err);
      } else {
        getBasicFromGRPC(handleChange, res.toObject());
      }
    });
  };

  const path = usePath();

  useEffect(() => {
    GetBasic();
    limitedAccess(["admin"], path);
    //eslint-disable-next-line
  }, []);

  return (
    <MDBContainer className="mt-4">
      <form className="basic-form" onSubmit={handleSubmit}>
        <BackToSettings>
          <p className="h4 text-center mb-4">Basic Information</p>
        </BackToSettings>

        <MDBRow>
          <MDBCol md="12" style={{ margin: "auto" }}>
            <MDBInput
              label="Site name"
              type="text"
              value={userInput.sitename}
              onChange={e => handleChange("sitename", e.target.value)}
            />
          </MDBCol>
        </MDBRow>
        <MDBRow>
          <MDBCol md="6">
            <MDBInput
              label="Primary Email"
              type="text"
              value={userInput.primaryemail}
              onChange={e => handleChange("primaryemail", e.target.value)}
            />
          </MDBCol>
          <MDBCol md="6">
            <MDBInput
              label="Secondary Email"
              type="text"
              value={userInput.secondaryemail}
              onChange={e => handleChange("secondaryemail", e.target.value)}
            />
          </MDBCol>
        </MDBRow>
        <MDBRow>
          <MDBCol md="6">
            <MDBInput
              label="Primary Phone"
              type="text"
              value={userInput.primaryphone}
              onChange={e => handleChange("primaryphone", e.target.value)}
            />
          </MDBCol>
          <MDBCol md="6">
            <MDBInput
              label="Office hours"
              type="text"
              value={userInput.workinghours}
              onChange={e => handleChange("workinghours", e.target.value)}
            />
          </MDBCol>
        </MDBRow>
        <MDBRow>
          <MDBCol md="6">
            <MDBInput
              label="Address"
              type="text"
              value={userInput.primaryaddress}
              onChange={e => handleChange("primaryaddress", e.target.value)}
            />
          </MDBCol>
          <MDBCol md="6">
            <MDBInput
              label="Address 2"
              type="text"
              value={userInput.secondaryaddress}
              onChange={e => handleChange("secondaryaddress", e.target.value)}
            />
          </MDBCol>
        </MDBRow>

        <div className="text-center mt-4">
          <MDBBtn color="info" onClick={() => handleSubmit()}>
            Save <MDBIcon far icon="paper-plane" className="ml-2" />
          </MDBBtn>
        </div>
      </form>
    </MDBContainer>
  );
};

export default FormPage;
