import React, { useState, useEffect, useReducer } from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBIcon,
  MDBInput
} from "mdbreact";
import Rating from "@material-ui/lab/Rating";
import { Modal } from "antd";

import Upload from "../../../../components/upload/Upload";
import { teamInput, GetGRPCTeam } from "../../../../utils/grpc";
import { newTeam, getTeams } from "../../../../utils/backend";
import TeamTable from "../../../../components/landing/team/TeamTable";
import Img from "../../../../components/img/index";
import { usePath } from "hookrouter";
import { limitedAccess } from "../../../../utils/utils";

const { confirm } = Modal;

const OurTeam = () => {
  const [userInput, setUserInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    teamInput
  );

  const handleChange = (name, value) => {
    setUserInput({ [name]: value });
  };

  const [teams, setTeams] = useState("");

  const [editrating, setEditrating] = useState("");
  const [editname, setEditName] = useState("");
  const [editdes, setEditDes] = useState("");

  const [visible, setVisible] = useState(false);

  const submitHandler = e => {
    e.preventDefault();

    let team = GetGRPCTeam(userInput);

    handleChange("name", "");
    handleChange("description", "");
    handleChange("image", "");
    handleChange("rating", 0);

    newTeam(team, err => {
      if (err) {
        console.log(err);
      } else {
        fetchTeamData();
      }
    });
  };

  const handleEdit = e => {
    e.preventDefault();
  };

  const fetchTeamData = () => {
    getTeams((err, res) => {
      if (err) {
        console.log(err);
      } else {
        setTeams(res.toObject().teamsList);
        console.log(res.toObject());
      }
    });
  };

  const edit = id => {
    console.log(id);
  };

  const path = usePath();

  useEffect(() => {
    fetchTeamData();
    limitedAccess(["admin"], path);
    //eslint-disable-next-line
  }, []);

  return (
    <MDBContainer>
      <p className="h4 text-center mb-4">Team</p>
      <MDBRow>
        <MDBCol md="6">
          <form onSubmit={submitHandler} encType="multipart/form-data">
            <MDBRow>
              <MDBCol md="12">
                <MDBInput
                  label="Name"
                  type="text"
                  value={userInput.name}
                  onChange={e => {
                    handleChange("name", e.target.value);
                  }}
                />
              </MDBCol>
            </MDBRow>
            <MDBRow>
              <MDBCol md="12">
                <Rating
                  name="rating"
                  value={userInput.rating}
                  precision={0.5}
                  onChange={e => {
                    handleChange("rating", e.target.value);
                  }}
                />
              </MDBCol>
            </MDBRow>
            <MDBRow>
              <MDBCol md="12">
                <MDBInput
                  type="textarea"
                  label="Description"
                  rows="3"
                  value={userInput.description}
                  onChange={e => {
                    handleChange("description", e.target.value);
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
              <MDBBtn color="info" outline type="submit">
                Save <MDBIcon far icon="paper-plane" className="ml-2" />
              </MDBBtn>
            </div>
          </form>
        </MDBCol>
        <MDBCol md="6">
          <TeamTable
            edit={edit}
            confirm={confirm}
            fetchTeamData={fetchTeamData}
            teams={teams}
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
        <form onSubmit={submitHandler} encType="multipart/form-data">
          <MDBRow>
            <MDBCol md="12">
              <MDBInput
                label="Name"
                type="text"
                value={editname}
                onChange={e => {
                  setEditName(e.target.value);
                }}
              />
            </MDBCol>
          </MDBRow>
          <MDBRow>
            <MDBCol md="12">
              <Rating
                name="rating"
                value={editrating}
                precision={0.5}
                onChange={e => {
                  setEditrating(parseFloat(e.target.value));
                }}
              />
            </MDBCol>
          </MDBRow>
          <MDBRow>
            <MDBCol md="12">
              <MDBInput
                type="textarea"
                label="Description"
                rows="3"
                value={editdes}
                onChange={e => {
                  setEditDes(e.target.value);
                }}
              />
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

export default OurTeam;
