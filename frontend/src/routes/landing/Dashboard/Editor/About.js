import React, { useState, useEffect, useReducer } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput } from "mdbreact";
import Upload from "./Upload";
import { mixInput, GetGRPCMix } from "../../../../utils/grpc";
import Img from "../../../../components/img/index";
import { newMix, getMixes } from "../../../../utils/backend";
import { navigate, usePath } from "hookrouter";
import { limitedAccess } from "../../../../utils/utils";

export default () => {
  const [tab, setTab] = useState(0);

  const [userInput, setUserInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    mixInput
  );

  const handleChange = (name, value) => {
    setUserInput({ [name]: value });
  };

  const descriptionChange = e => {
    let ms = userInput.mixesList;
    ms[tab].description = e.target.value;

    handleChange("mixesList", ms);
  };

  const submit = () => {
    for (let mix of userInput.mixesList) {
      let g = GetGRPCMix(mix);

      newMix(g, (err, res) => {
        if (err) {
          console.log(err);
        } else {
          console.log(res.toObject());
          navigate("/");
        }
      });
    }
  };

  const getMix = () => {
    getMixes(null, (err, res) => {
      if (err) {
        console.log(err);
      } else {
        const mixes = res.toObject().mixesList;

        if (mixes.length !== 0) {
          handleChange("mixesList", res.toObject().mixesList);
        }
      }
    });
  };

  const path = usePath();

  useEffect(() => {
    getMix();
    limitedAccess(["admin"], path);
    //eslint-disable-next-line
  }, []);

  return (
    <MDBContainer>
      <form className="about-form">
        <p className="h4 text-center mb-4">About</p>
        <MDBRow>
          <MDBCol md="12" style={{ margin: "auto" }}>
            <div className="custom-control custom-radio custom-control-inline">
              <input
                defaultChecked={tab === 0}
                type="radio"
                className="custom-control-input"
                id="radio1"
                name="about"
                onClick={e => {
                  setTab(0);
                }}
              />
              <label className="custom-control-label" htmlFor="radio1">
                How We Are
              </label>
            </div>
            <div className="custom-control custom-radio custom-control-inline">
              <input
                defaultChecked={tab === 1}
                type="radio"
                className="custom-control-input"
                id="radio2"
                name="about"
                onClick={e => {
                  setTab(1);
                }}
              />
              <label className="custom-control-label" htmlFor="radio2">
                Our Mission
              </label>
            </div>
            <div className="custom-control custom-radio custom-control-inline">
              <input
                defaultChecked={tab === 2}
                type="radio"
                className="custom-control-input"
                id="radio3"
                name="about"
                onClick={() => {
                  setTab(2);
                }}
              />
              <label className="custom-control-label" htmlFor="radio3">
                Our Values
              </label>
            </div>
          </MDBCol>
        </MDBRow>
        <MDBRow>
          <MDBCol md="12">
            <MDBInput
              type="textarea"
              label="Description"
              rows="3"
              value={userInput.mixesList[tab].description}
              onChange={e => descriptionChange(e)}
            />
          </MDBCol>
        </MDBRow>
        <MDBRow>
          <MDBCol md="12">
            <Upload
              setImage={image => {
                let ms = userInput.mixesList;

                ms[tab].image = image;
                handleChange("mixesList", ms);
              }}
            />
            {userInput.mixesList[tab].image ? (
              <Img
                className="img-thumb "
                src={userInput.mixesList[tab].image}
              />
            ) : (
              ""
            )}
          </MDBCol>
        </MDBRow>
        <div className="text-center mt-4">
          <MDBBtn color="info" outline onClick={() => submit()}>
            Save
          </MDBBtn>
        </div>
      </form>
    </MDBContainer>
  );
};
