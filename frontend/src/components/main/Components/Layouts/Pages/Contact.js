import React, { useEffect, useReducer } from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBBtn,
  MDBCard,
  MDBInput
} from "mdbreact";
import "./page.css";
import { getBasic } from "../../../../../utils/backend";
import { basicInput, getBasicFromGRPC } from "../../../../../utils/grpc";

const color = {
  color: "#979798"
};
export default () => {
  const [userInput, setUserInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    basicInput
  );

  const handleChange = (name, value) => {
    setUserInput({ [name]: value });
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

  useEffect(() => {
    GetBasic();
    //eslint-disable-next-line
  }, []);

  return (
    <div id="contact" className="contact-us ">
      <div className="block-title text-center">
        <MDBContainer>
          <h2>
            Contact <span style={{ fontWeight: "bold" }}>Us</span>
          </h2>
          <MDBRow>
            {" "}
            <p id="contact-us-p">
              In an idea world this website wouldn't exist,a client would
              acknowledge the importance of having web copy before the design
              starts
            </p>
          </MDBRow>
        </MDBContainer>
      </div>
      <div>
        <MDBContainer>
          <MDBRow>
            <MDBCol md="4" className="mt-xl-5 mb-5">
              <MDBCard>
                <span>
                  {" "}
                  <MDBIcon
                    icon="map-marker-alt"
                    size="2x"
                    style={{
                      width: "62px",
                      textAlign: "center"
                    }}
                    className="contact-us-icons"
                  />
                  <div className="contact-steps">
                    <h6 className="contact-us-h6">Address</h6>
                    <p style={color}>
                      {userInput.address1}
                      <br />
                      {userInput.address2}
                    </p>
                  </div>
                </span>
              </MDBCard>
            </MDBCol>
            <MDBCol md="4" className=" mt-xl-5 mb-5">
              <MDBCard>
                <span>
                  <MDBIcon
                    icon="envelope"
                    size="2x"
                    className="contact-us-icons"
                  />
                  <div className="contact-steps">
                    <h6 className="contact-us-h6">Email</h6>
                    <p style={color}>
                      {userInput.primaryemail}
                      <br />
                      {userInput.secondaryemail}
                    </p>
                    {/* <p className="mb-md-0">sale@gmail.com</p> */}
                  </div>
                </span>
              </MDBCard>
            </MDBCol>
            <MDBCol md="4" className="mt-xl-5 mb-5">
              <MDBCard>
                <span>
                  <MDBIcon
                    icon="phone"
                    size="2x"
                    className="contact-us-icons"
                  />
                  <div className="contact-steps">
                    <h6 className="contact-us-h6">Phone</h6>
                    <p style={color}>
                      {userInput.primaryphone}
                      <br />
                      {userInput.workinghours}
                    </p>
                    {/* <p className="mb-md-0">Mon - Fri, 8:00-22:00</p> */}
                  </div>
                </span>
              </MDBCard>
            </MDBCol>
          </MDBRow>
          <MDBRow>
            <MDBCol md="4" className="text-md-left mt-xl-5 mb-5">
              <h3>Get in Touch</h3>
              <hr />
              <p
                style={{
                  color: "#979798",
                  paddingRight: "10px"
                }}
              >
                Lorem ipsum dolor sit amet, consect etur adipis icing elit.
                Nihil odit magnam minima, soluta dolor ibus reic iendis moles
                tiae placeat unde eos mole stias. Quis quam aperiam, pariatur.
                Tempora, placeat ratione porro volup tate odit minima.
              </p>
              <ul
                className="list-inline text-center list-unstyled"
                style={{ float: "left" }}
              >
                <li className="list-inline-item">
                  <a href="#!" className=" w-ic">
                    <MDBIcon fab icon="facebook-f" className="contact-icons" />
                  </a>
                </li>
                <li className="list-inline-item">
                  <a href="#!" className=" w-ic">
                    <MDBIcon fab icon="twitter" className="contact-icons" />
                  </a>
                </li>
                <li className="list-inline-item">
                  <a href="#!" className="w-ic">
                    <MDBIcon fab icon="instagram" className="contact-icons" />
                  </a>
                </li>
                <li className="list-inline-item">
                  <a href="#!" className=" w-ic">
                    <MDBIcon fab icon="linkedin" className="contact-icons" />
                  </a>
                </li>
              </ul>
            </MDBCol>
            <MDBCol md="8" className="text-md-left mt-xl-5 mb-5">
              <form>
                <MDBRow style={{ marginTop: "-2%" }}>
                  <MDBCol md="6">
                    <div className="md-form mb-0">
                      <MDBInput
                        type="text"
                        id="contact-name"
                        label="Your name"
                      />
                    </div>
                  </MDBCol>
                  <MDBCol md="6">
                    <div className="md-form mb-0">
                      <MDBInput
                        type="text"
                        id="contact-email"
                        label="Your email"
                      />
                    </div>
                  </MDBCol>
                </MDBRow>
                <MDBRow>
                  <MDBCol md="12">
                    <div className="md-form mb-0">
                      <MDBInput
                        type="textarea"
                        id="contact-message"
                        label="Your message"
                      />
                    </div>
                  </MDBCol>
                </MDBRow>
                <MDBRow>
                  <MDBCol md="12">
                    <MDBBtn id="snd-msg" color="success">
                      Send Message
                    </MDBBtn>
                  </MDBCol>
                </MDBRow>
              </form>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
    </div>
  );
};
